import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content/no-content.component';

export const AppRoutes: Routes = [
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
  },
  {
    path: 'admin',
    loadChildren: 'app/profile/profile.module#ProfileModule',
  },
  {
    path: '**', component: NoContentComponent,
  },
];
