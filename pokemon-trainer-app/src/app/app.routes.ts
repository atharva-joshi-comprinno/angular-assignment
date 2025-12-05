import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing')
      .then(m => m.Landing)
  },
  {
    path: 'catalogue',
    loadComponent: () => import('./features/catalogue/catalogue')
      .then(m => m.Catalogue)
  },
  {
    path: 'trainer',
    loadComponent: () => import('./features/trainer/trainer')
      .then(m => m.Trainer)
  }
];
