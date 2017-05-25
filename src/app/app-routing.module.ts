import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
  },
  {
    path: 'admin',
    loadChildren: 'app/profile/profile.module#ProfileModule',
  }
];
