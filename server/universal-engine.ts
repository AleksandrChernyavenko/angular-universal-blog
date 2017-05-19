// angular
import { Provider, NgModuleFactory, NgModuleRef, ApplicationRef, Type } from '@angular/core';
import { platformServer, platformDynamicServer, PlatformState, INITIAL_CONFIG } from '@angular/platform-server';

// libs
import * as fs from 'fs';
import { Request, Response, Send } from 'express';
import { getInlineCode } from 'preboot';

export interface NgSetupOptions {
  aot?: boolean;
  bootstrap: Type<{}> | NgModuleFactory<{}>;
  providers?: Provider[];
}

const templateCache: { [key: string]: string } = {};
const prebootInline = getInlineCode({
  appRoot: 'in-root',
  uglify: true,
  eventSelectors: [
    { selector: 'input,textarea', events: ['keypress', 'keyup', 'keydown', 'input', 'change'] },
    { selector: 'select,option', events: ['change'] },
    { selector: 'input,textarea', events: ['focusin', 'focusout', 'mousedown', 'mouseup'], noReplay: true },
    { selector: 'input[type="submit"],button,a[href],.preboot-click', events: ['click'] }
  ]
});

function getRequestResponseProviders(req: Request, res: Response): Provider[] {
  const providers: Provider[] = [
    {
      provide: 'REQUEST',
      useValue: req
    }
  ];

  if (res) {
    providers.push({
      provide: 'RESPONSE',
      useValue: res
    });
  }

  return providers;
}

/**
 * Get the document at the file path
 */
function getDocument(filePath: string): string {
  let template =  templateCache[filePath] || fs.readFileSync(filePath).toString();
  return templateCache[filePath] = template.replace('<!--preboot-->', `<script>${prebootInline}</script></head>`);
}

/**
 * Handle the request with a given NgModuleRef
 */
function handleModuleRef(moduleRef: NgModuleRef<{}>, callback: Send): void {
  const state = moduleRef.injector.get(PlatformState);
  const appRef = moduleRef.injector.get(ApplicationRef);

  appRef.isStable
    .filter((isStable: boolean) => isStable)
    .first()
    .subscribe(() => {
      const bootstrap = moduleRef.instance['ngOnBootstrap'];
      bootstrap();

      callback(null, state.renderToString());
      moduleRef.destroy();
    });
}

/**
 * This is an express engine for handling Angular Applications
 */
export function ngExpressEngine(setupOptions: NgSetupOptions): any {
  setupOptions.providers = setupOptions.providers || [];

  return function (filePath: string, options: { req: Request, res?: Response }, callback: Send): void {
    try {
      const moduleFactory = setupOptions.bootstrap;

      if (!moduleFactory) {
        throw new Error('You must pass in a NgModule or NgModuleFactory to be bootstrapped');
      }

      const extraProviders = setupOptions.providers.concat(
        getRequestResponseProviders(options.req, options.res),
        [
          {
            provide: INITIAL_CONFIG,
            useValue: {
              document: getDocument(filePath),
              url: options.req.originalUrl
            }
          }
        ]);

      const moduleRefPromise = setupOptions.aot ?
        platformServer(extraProviders).bootstrapModuleFactory(<NgModuleFactory<{}>>moduleFactory) :
        platformDynamicServer(extraProviders).bootstrapModule(<Type<{}>>moduleFactory);

      moduleRefPromise.then((moduleRef: NgModuleRef<{}>) => {
        handleModuleRef(moduleRef, callback);
      });
    } catch (e) {
      callback(e);
    }
  };
}
