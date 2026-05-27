import { Routes } from '@angular/router';
import { WelcomeComponent } from '../features/welcome/components/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'body-select',
    loadComponent: () =>
      import('../features/body/components/body-type-select.component')
        .then((m) => m.BodyTypeSelectComponent),
  },
];
