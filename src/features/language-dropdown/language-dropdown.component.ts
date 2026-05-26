import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { LANGUAGES, Language } from '../../app/core/i18n/languages';

@Component({
  selector: 'symo-language-dropdown',
  standalone: true,
  imports: [FormsModule, TranslocoModule],
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.css'],
})
export class LanguageDropdownComponent {
  /** Two-way bindable as [(value)] — holds the language `code`. */
  @Input() value = 'en';
  @Output() valueChange = new EventEmitter<string>();

  readonly languages = LANGUAGES;
  readonly open = signal(false);
  readonly query = signal('');

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  constructor(private host: ElementRef<HTMLElement>) {}

  get selected(): Language {
    return (
      this.languages.find(
        (l) =>
          l.code === this.value ||
          l.native === this.value ||
          l.label === this.value,
      ) ?? this.languages[0]
    );
  }

  get filtered(): Language[] {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.languages;
    return this.languages.filter(
      (l) =>
        l.label.toLowerCase().includes(q) ||
        l.native.toLowerCase().includes(q),
    );
  }

  toggle(): void {
    this.open.update((o) => !o);
    if (this.open()) {
      // focus search after the panel becomes interactive
      setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
    }
  }

  select(lang: Language): void {
    this.value = lang.code;
    this.valueChange.emit(lang.code);
    this.open.set(false);
    this.query.set('');
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open.set(false);
  }
}