import { NgModule, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { ServerModule } from '@angular/platform-server';
import { CacheService, CACHE, STORAGE } from './core/universal-cache/core';
import { ServerCacheModule, FsCacheService } from './core/universal-cache/platform-server';
import { ServerStateTransferModule, ServerStateTransferService } from './core/universal-cache/state-transfer';
import { fsStorageFactory, FsStorageLoader, FsStorageService } from './core/universal-cache/fs-storage';
import {CookieNodeService} from './core/cookie-node.service';

declare const Zone: any;

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { SiteModule } from './site/site.module';

declare const require: any;

export function getRequest() {
  return Zone.current.get('req') || {cookies: {}};
}

export function getResponse() {
  return Zone.current.get('res') || {cookies: {}};
}

export function mockClass() {
}


export class ServerFactoryLoader extends NgModuleFactoryLoader {
  load(path: string): Promise<NgModuleFactory<any>> {
    return new Promise((resolve) => {
      const [file, className] = path.split('#');
      const classes = require('../../dist/ngfactory/src/' + file + '.ngfactory');
      resolve(classes[className + 'NgFactory']);
    });
  }
}

@NgModule({
  imports: [
    ServerStateTransferModule.forRoot(),
    ServerCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: FsCacheService
      },
      {
        provide: STORAGE,
        useClass: FsStorageService
      },
      {
        provide: FsStorageLoader,
        useFactory: (fsStorageFactory)
      }
    ]),
    ServerModule,
    AppModule,
    SiteModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    CacheService,
    ServerStateTransferService,
    {provide: 'CookieService', useClass: CookieNodeService},
    {provide: 'req', useFactory: getRequest},
    {provide: 'res', useFactory: getResponse},
    {provide: 'Window', useFactory: mockClass},
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    {
      provide: 'isBrowser',
      useValue: false
    },
    {
      provide: NgModuleFactoryLoader,
      useClass: ServerFactoryLoader
    }
  ]
})
export class AppServerModule {
  constructor(private readonly stateTransfer: ServerStateTransferService,
              private readonly cache: CacheService) {
  }

  ngOnBootstrap = () => {
    this.stateTransfer.set(this.cache.key, JSON.stringify(this.cache.dehydrate()));
    this.stateTransfer.inject();
  }
}
