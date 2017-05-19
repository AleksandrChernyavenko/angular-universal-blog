import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site.component';

const routes: Routes = [{
  path: '',
  component: SiteComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class SiteRoutingModule { }
