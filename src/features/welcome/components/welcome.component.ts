import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.language = this.transloco.getActiveLang();
    // apply lang/dir for the starting language so the right Noto font loads immediately
    const lang = LANGUAGES.find((l) => l.code === this.language);
    document.documentElement.lang = this.language;
    document.documentElement.dir = lang?.rtl ? 'rtl' : 'ltr';
  }

  onLanguageChange(code: string): void {
    this.language = code;
    this.transloco.setActiveLang(code);
    this.applyLang(code);
  }

  private applyLang(code: string): void {
    const lang = LANGUAGES.find((l) => l.code === code);
    this.document.documentElement.lang = code;
    this.document.documentElement.dir = lang?.rtl ? 'rtl' : 'ltr';
  }

  start(): void {
    this.router.navigate(['/body-select']);
  }
}