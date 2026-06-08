import {
  AfterViewInit, Component, ElementRef, ViewChild,
  inject, signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { SessionStore } from '../../../app/core/state/session.store';
import {
  symptomKo, durationKo, durationEn,
  allergyKo, medicationKo, historyKo,
} from '../../../app/core/data/translations-ko.data';
import {
  regionSymptoms, skinSymptoms, generalSymptoms,
} from '../../../app/core/data/symptoms.data-en';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'symo-summary',
  standalone: true,
  imports: [TranslocoModule, TopBarComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [provideTranslocoScope('summary')],
})
export class SummaryComponent implements AfterViewInit {
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  readonly store = inject(SessionStore);

  @ViewChild('printable') printable!: ElementRef<HTMLElement>;

  readonly pdfUrl = signal<SafeResourceUrl | null>(null);
  readonly generating = signal(true);
  readonly today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
  readonly bodyShapeSvg = signal<SafeHtml | null>(null);
  readonly bodyAspectRatio = signal<string>('1 / 2.4');  // sensible default

  private symptomNameMap = (() => {
    const all = [
      ...skinSymptoms,
      ...generalSymptoms,
      ...Object.values(regionSymptoms).flat(),
    ];
    const m = new Map<string, string>();
    for (const s of all) m.set(s.id, s.name);
    return m;
  })();

  symptomName(id: string): string { return this.symptomNameMap.get(id) ?? id; }
  symptomKoName(id: string): string { return symptomKo[id] ?? this.symptomName(id); }
  durationKoLabel(id: string): string { return durationKo[id] ?? ''; }
  durationEnLabel(id: string): string { return durationEn[id] ?? ''; }
  allergyKoLabel(id: string): string { return allergyKo[id] ?? ''; }
  medicationKoLabel(id: string): string { return medicationKo[id] ?? ''; }
  historyKoLabel(id: string): string { return historyKo[id] ?? ''; }

  private async loadBodyShape(): Promise<void> {
    const g = this.store.bodyType() === 'female' ? 'Female' : 'Male';
    try {
      const res = await fetch(`/images/${g}_Shape.svg`);
      if (!res.ok) throw new Error(`${res.status}`);
      let text = await res.text();
    
      // Pull aspect ratio from viewBox so the container matches SVG proportions
      const vb = text.match(/viewBox\s*=\s*["']([^"']+)["']/i);
      if (vb) {
        const parts = vb[1].trim().split(/\s+/).map(Number);
        if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
          this.bodyAspectRatio.set(`${parts[2]} / ${parts[3]}`);
        }
      }
    
      text = text
        .replace(/<svg([^>]*?)\s+width\s*=\s*["'][^"']*["']/i, '<svg$1')
        .replace(/<svg([^>]*?)\s+height\s*=\s*["'][^"']*["']/i, '<svg$1')
        .replace(/<svg(?![^>]*\spreserveAspectRatio=)/i, '<svg preserveAspectRatio="xMidYMid meet"');
      this.bodyShapeSvg.set(this.sanitizer.bypassSecurityTrustHtml(text));
    } catch (err) {
      console.warn('Body shape SVG failed to load', err);
    }
  }

  private async waitForImages(): Promise<void> {
    const imgs = Array.from(this.printable.nativeElement.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((res) => {
              img.addEventListener('load', () => res(), { once: true });
              img.addEventListener('error', () => res(), { once: true });
            }),
      ),
    );
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadBodyShape();
    await document.fonts.ready;
    await this.waitForImages();
    await new Promise((r) => setTimeout(r, 50));
    await this.generatePdf();
  }

  private async generatePdf(): Promise<void> {
    this.generating.set(true);
    try {
      const el = this.printable.nativeElement;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageW = 210;
      const pageH = 297;
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageW;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 1mm tolerance prevents a near-empty page 2 from floating-point overflow
      if (imgHeight <= pageH + 1) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        let position = 0;
        let remaining = imgHeight;
        while (remaining > 0) {
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          remaining -= pageH;
          position -= pageH;
          if (remaining > 1) pdf.addPage();   // also use tolerance here
        }
      }

      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    } catch (err) {
      console.error('PDF generation failed', err);
    } finally {
      this.generating.set(false);
    }
  }

  reset(): void {
    this.store.reset();
    this.router.navigate(['/']);
  }
}