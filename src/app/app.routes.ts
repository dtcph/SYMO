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
  {
    path: 'pin',
    loadComponent: () =>
      import('../features/pin/components/pin.component').then((m) => m.PinComponent),
  },
  {
    path: 'info',
    loadComponent: () =>
      import('../features/info/components/info.component').then((m) => m.InfoComponent),
  },
];
