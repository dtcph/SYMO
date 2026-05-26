import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { LANGUAGES } from './core/i18n/languages';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient(withFetch()), provideTransloco({
        config: { 
          availableLangs: LANGUAGES.map((l) => l.code),
          defaultLang: 'en',
          fallbackLang: 'en',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })]
};
