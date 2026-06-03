import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { SearchableMultiselectDropdownComponent } from
  '../../shared/searchable-multiselect-dropdown/searchable-multiselect-dropdown.component';
import { SessionStore, UserInfo, UserInfoItem } from
  '../../../app/core/state/session.store';
import {
  allergyOptions, medicationOptions, historyOptions,
} from '../../../app/core/data/medical-info.data';

@Component({
  selector: 'symo-info',
  standalone: true,
  imports: [TranslocoModule, TopBarComponent, SearchableMultiselectDropdownComponent],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [provideTranslocoScope('info')],
})
export class InfoComponent {
  private router = inject(Router);
  readonly store = inject(SessionStore);

  readonly allergyOptions = allergyOptions;
  readonly medicationOptions = medicationOptions;
  readonly historyOptions = historyOptions;

  update(field: keyof UserInfo, items: UserInfoItem[]): void {
    this.store.setUserInfo({ [field]: items });
  }

  next(): void {
    this.router.navigate(['/summary']);
  }
}