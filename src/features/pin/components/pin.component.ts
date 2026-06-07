import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService, provideTranslocoScope } from '@jsverse/transloco';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { SessionStore } from '../../../app/core/state/session.store';
import {
  Side,
  Symptom,
  RegionKey,
  DURATIONS,
  getRegionFromCoordinates,
} from '../../../app/core/data/symptoms.data-en';

/* private transloco = inject(TranslocoService); */

type Tab = 'internal' | 'skin';
type Step = 1 | 2;

type SymptomsDataModule = typeof import('../../../app/core/data/symptoms.data-en');

const symptomDataLoaders: Record<string, () => Promise<SymptomsDataModule>> = {
  en: () => import('../../../app/core/data/symptoms.data-en'),
  zh: () => import('../../../app/core/data/symptoms.data-zh'),
  'zh-TW': () => import('../../../app/core/data/symptoms.data-zh-TW'),
  ja: () => import('../../../app/core/data/symptoms.data-ja'),
  vi: () => import('../../../app/core/data/symptoms.data-vi'),
  es: () => import('../../../app/core/data/symptoms.data-es'),
  fr: () => import('../../../app/core/data/symptoms.data-fr'),
  de: () => import('../../../app/core/data/symptoms.data-de'),
  pt: () => import('../../../app/core/data/symptoms.data-pt'),
  ru: () => import('../../../app/core/data/symptoms.data-ru'),
  ar: () => import('../../../app/core/data/symptoms.data-ar'),
  hi: () => import('../../../app/core/data/symptoms.data-hi'),
  id: () => import('../../../app/core/data/symptoms.data-id'),
  th: () => import('../../../app/core/data/symptoms.data-th'),
  tr: () => import('../../../app/core/data/symptoms.data-tr'),
  it: () => import('../../../app/core/data/symptoms.data-it'),
  nl: () => import('../../../app/core/data/symptoms.data-nl'),
  pl: () => import('../../../app/core/data/symptoms.data-pl'),
  fil: () => import('../../../app/core/data/symptoms.data-fil'),
  mn: () => import('../../../app/core/data/symptoms.data-mn'),
  uk: () => import('../../../app/core/data/symptoms.data-uk'),
  ms: () => import('../../../app/core/data/symptoms.data-ms'),
  fa: () => import('../../../app/core/data/symptoms.data-fa'),
  bn: () => import('../../../app/core/data/symptoms.data-bn'),
  ur: () => import('../../../app/core/data/symptoms.data-ur'),
};

@Component({
  selector: 'symo-pin',
  standalone: true,
  imports: [TranslocoModule, TopBarComponent],
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css'],
  providers: [provideTranslocoScope('pin')],
})

export class PinComponent implements OnInit {
  private router = inject(Router);
  private transloco = inject(TranslocoService);
  readonly store = inject(SessionStore);

  private symptomData = signal<SymptomsDataModule | null>(null);

  readonly durations = DURATIONS;

  readonly side = signal<Side>('front');
  readonly activePinId = signal<string | null>(null);
  readonly tab = signal<Tab>('internal');
  readonly query = signal('');
  readonly sheetStep = signal<Step>(1);

  private gender = computed(() => (this.store.bodyType() === 'female' ? 'Female' : 'Male'));
  readonly frontSrc = computed(() => `/images/Bodymap_${this.gender()}_Front.svg`);
  readonly backSrc = computed(() => `/images/Bodymap_${this.gender()}_Back.svg`);

  readonly visiblePins = computed(() =>
    this.store.pins().filter((p) => p.side === this.side()),
  );
  readonly activePin = computed(
    () => this.store.pins().find((p) => p.id === this.activePinId()) ?? null,
  );

  /** Internal tab = region + general (deduped). Skin tab = global skin list. */
  readonly currentSymptoms = computed<Symptom[]>(() => {
  const data = this.symptomData();
  const pin = this.activePin();

  if (!data || !pin) return [];

  let list: Symptom[];

  if (this.tab() === 'skin') {
    list = data.skinSymptoms;
  } else {
    const merged = [
      ...data.regionSymptoms[pin.region as RegionKey],
      ...data.generalSymptoms,
    ];

    const seen = new Set<string>();
    list = merged.filter((s) =>
      seen.has(s.id) ? false : (seen.add(s.id), true),
    );
  }

  const q = this.query().trim().toLowerCase();
  return q ? list.filter((s) => s.name.toLowerCase().includes(q)) : list;
});

  /** Name lookup for the step-2 context chips. */
  readonly selectedSymptomNames = computed<string[]>(() => {
  const data = this.symptomData();
  const pin = this.activePin();

  if (!data || !pin) return [];

  const all = [
    ...data.skinSymptoms,
    ...data.generalSymptoms,
    ...Object.values(data.regionSymptoms).flat(),
  ];

  const map = new Map(all.map((s) => [s.id, s.name]));

  return pin.symptoms.map((id) => map.get(id) ?? id);
});

  readonly canContinue = computed(() =>
    this.store.pins().some((p) => p.symptoms.length > 0 && !!p.duration),
  );

ngOnInit(): void {
  if (!this.store.bodyType()) {
    this.router.navigate(['/body-select']);
    return;
  }

  this.loadSymptomsForLanguage(this.transloco.getActiveLang());
  }

  private async loadSymptomsForLanguage(code: string): Promise<void> {
    const loader = symptomDataLoaders[code] ?? symptomDataLoaders['en'];

    try {
      const data = await loader();
      this.symptomData.set(data);
    } catch (error) {
      console.error(`Could not load symptoms for language "${code}". Falling back to English.`, error);
      const fallbackData = await symptomDataLoaders['en']();
      this.symptomData.set(fallbackData);
    }
  }

  regionLabel(region: string): string {
  return this.symptomData()?.regionLabels[region] ?? region;
  }

  onBodyClick(e: MouseEvent): void {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const anatomicalX = this.side() === 'back' ? 100 - x : x;
    const region = getRegionFromCoordinates(anatomicalX, y, this.side());
    const id = this.store.addPin({
      x, y, side: this.side(), region, symptoms: [], duration: '', severity: 5,
    });
    this.activePinId.set(id);
    this.openSheet();
  }

  onPinClick(e: MouseEvent, id: string): void {
    e.stopPropagation();
    this.activePinId.set(id);
    this.openSheet();
  }

  private openSheet(): void {
    this.sheetStep.set(1);
    this.tab.set('internal');
    this.query.set('');
  }

  toggleSymptom(symId: string): void {
    const pin = this.activePin();
    if (!pin) return;
    const symptoms = pin.symptoms.includes(symId)
      ? pin.symptoms.filter((s) => s !== symId)
      : [...pin.symptoms, symId];
    this.store.updatePin(pin.id, { symptoms });
  }
  isSelected(symId: string): boolean {
    return this.activePin()?.symptoms.includes(symId) ?? false;
  }

  setDuration(durId: string): void {
    const pin = this.activePin();
    if (pin) this.store.updatePin(pin.id, { duration: durId });
  }
  setSeverity(value: string): void {
    const pin = this.activePin();
    if (pin) this.store.updatePin(pin.id, { severity: Number(value) });
  }

  goToStep2(): void {
    if ((this.activePin()?.symptoms.length ?? 0) > 0) this.sheetStep.set(2);
  }
  goBackToStep1(): void {
    this.sheetStep.set(1);
  }

  deleteActivePin(): void {
    const pin = this.activePin();
    if (!pin) return;
    this.store.removePin(pin.id);
    this.activePinId.set(null);
  }

  closeSheet(): void {
    const pin = this.activePin();
    if (pin && pin.symptoms.length === 0) this.store.removePin(pin.id);
    this.activePinId.set(null);
  }

  flip(): void {
    this.side.update((s) => (s === 'front' ? 'back' : 'front'));
    this.activePinId.set(null);
  }

  clearAll(): void {
    if (this.store.pins().length === 0) return;
    if (confirm('Remove all pins?')) {
      this.store.clearPins();
      this.activePinId.set(null);
    }
  }

  next(): void {
    if (this.canContinue()) this.router.navigate(['/info']);
  }
}