import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site.component';
import { NoContentComponent } from './no-content/no-content.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      { path: '',  component: CategoryListComponent },
      {
        path: '**', component: NoContentComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class SiteRoutingModule {
}
