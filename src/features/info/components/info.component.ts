import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { SessionStore, UserInfo } from '../../../app/core/state/session.store';

type Field = keyof UserInfo;

@Component({
  selector: 'symo-info',
  standalone: true,
  imports: [TranslocoModule, TopBarComponent],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [provideTranslocoScope('info')],
})
export class InfoComponent {
  private router = inject(Router);
  readonly store = inject(SessionStore);

  update(field: Field, value: string): void {
    this.store.setUserInfo({ [field]: value });
  }

  next(): void {
    this.router.navigate(['/summary']);
  }
}