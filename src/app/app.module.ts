import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CacheModule, CACHE } from './core/universal-cache/core';
import { BrowserCacheModule, MemoryCacheService, STATE_ID } from './core/universal-cache/platform-browser';
import { DEFAULT_STATE_ID, BrowserStateTransferModule } from './core/universal-cache/state-transfer';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AppRoutes } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ApiModule } from './api';
import { DefaultRequestOptions, CookieBrowserService } from './core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { NoContentComponent } from './no-content/no-content.component';
import { SiteModule } from './site/site.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function getRequest() {
  return {cookie: document.cookie};
}

export function getResponse() {
  return {};
}

export function Window() {
  return window;
}

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
  ],
  imports: [
    ApiModule,
    CacheModule.forRoot(),
    BrowserStateTransferModule.forRoot(),
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService
      },
      {
        provide: STATE_ID,
        useValue: DEFAULT_STATE_ID
      }
    ]),
    // HomeModule,
    BrowserAnimationsModule,
    SiteModule,
    BrowserModule.withServerTransition({
      appId: 'app'
    }),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule
  ],
  providers: [
    {provide: 'isBrowser', useValue: true},
    {provide: 'CookieService', useClass: CookieBrowserService},
    {provide: 'req', useFactory: getRequest},
    {provide: 'res', useFactory: getResponse},
    {provide: 'Window', useFactory: Window},
    {provide: RequestOptions, useClass: DefaultRequestOptions}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
