import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { SessionStore } from '../../../app/core/state/session.store';

type Side = 'front' | 'back';

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
  readonly store = inject(SessionStore);

  readonly side = signal<Side>('front');

  private gender = computed(() => (this.store.bodyType() === 'female' ? 'Female' : 'Male'));
  readonly frontSrc = computed(() => `/images/Bodymap_${this.gender()}_Front.svg`);
  readonly backSrc = computed(() => `/images/Bodymap_${this.gender()}_Back.svg`);

  ngOnInit(): void {
    // can't pin a body that was never chosen — same guard as the React effect
    if (!this.store.bodyType()) {
      this.router.navigate(['/body']);
    }
  }

  flip(): void {
    this.side.update((s) => (s === 'front' ? 'back' : 'front'));
  }
}