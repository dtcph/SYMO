import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { SessionStore } from '../../../app/core/state/session.store';
import {
  Symptom, regionSymptoms, skinSymptoms, generalSymptoms, regionLabels,
} from '../../../app/core/data/symptoms.data';
import {
  regionKo, durationKo, durationEn, sideKo, symptomKo,
} from '../../../app/core/data/translations-ko.data';

@Component({
  selector: 'symo-summary',
  standalone: true,
  imports: [TranslocoModule, TopBarComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [provideTranslocoScope('summary')],
})
export class SummaryComponent {
  private router = inject(Router);
  readonly store = inject(SessionStore);

  private symptomIndex = new Map<string, Symptom>(
    [...skinSymptoms, ...generalSymptoms, ...Object.values(regionSymptoms).flat()]
      .map((s) => [s.id, s]),
  );

  getName(id: string): string {
    return this.symptomIndex.get(id)?.name ?? id;
  }
  ko(id: string): string {
    return symptomKo[id] ?? '';
  }
  regionEn(region: string): string {
    return regionLabels[region] ?? region;
  }
  regionKo(region: string): string {
    return regionKo[region] ?? region;
  }
  durationKo(id: string): string {
    return durationKo[id] ?? id;
  }
  durationEn(id: string): string {
    return durationEn[id] ?? id;
  }
  sideKo(side: string): string {
    return sideKo[side] ?? side;
  }

  hasMedicalInfo(): boolean {
    const u = this.store.userInfo();
    return !!(u.allergies || u.medications || u.history);
  }

  done(): void {
    this.store.reset();
    this.router.navigate(['/']);
  }
}