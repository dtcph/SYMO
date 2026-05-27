import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { SessionStore, BodyType } from '../../../app/core/state/session.store';

@Component({
  selector: 'symo-body-type-select',
  standalone: true,
  imports: [TranslocoModule, TopBarComponent],
  templateUrl: './body-type-select.component.html',
  styleUrls: ['./body-type-select.component.css'],
  providers: [provideTranslocoScope('body')],
})
export class BodyTypeSelectComponent {
  constructor(private router: Router, public store: SessionStore) {}

  select(type: BodyType): void {
    this.store.setBodyType(type);
  }

  continue(): void {
    if (!this.store.bodyType()) return;
    this.router.navigate(['/pin']);
  }
}