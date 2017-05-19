import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';

import { MaterialModule, MdNativeDateModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MdNativeDateModule,
    SiteRoutingModule,
  ],
  declarations: [
    SiteComponent
  ]
})
export class SiteModule {
}
