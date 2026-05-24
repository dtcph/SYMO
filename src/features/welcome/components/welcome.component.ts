import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService, provideTranslocoScope } from '@jsverse/transloco';
import { LanguageDropdownComponent } from '../../language-dropdown/language-dropdown.component';
import { LANGUAGES } from '../../../app/core/i18n/languages';

@Component({
  selector: 'symo-welcome',
  standalone: true,
  imports: [TranslocoModule, LanguageDropdownComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [provideTranslocoScope('welcome')],
})
export class WelcomeComponent {
  language: string;

  constructor(
    private router: Router,
    private transloco: TranslocoService,
  ) {
    this.language = this.transloco.getActiveLang();
  }

  onLanguageChange(code: string): void {
    this.language = code;
    this.transloco.setActiveLang(code);

    const lang = LANGUAGES.find((l) => l.code === code);
    document.documentElement.lang = code;
    document.documentElement.dir = lang?.rtl ? 'rtl' : 'ltr';
  }

  start(): void {
    this.router.navigate(['/body']);
  }
}