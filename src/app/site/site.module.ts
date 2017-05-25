import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { HeaderComponent } from './header/header.component';
import { NoContentComponent } from './no-content/no-content.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SiteRoutingModule,
  ],
  declarations: [
    SiteComponent,
    HeaderComponent,
    CategoryListComponent,
    FooterComponent,
    NoContentComponent,
  ]
})
export class SiteModule {
}
