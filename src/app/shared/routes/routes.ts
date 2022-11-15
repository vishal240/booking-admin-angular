import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'app',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'app'
  }
];
