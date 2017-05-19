# Angular 4 Starter

Angular CLI, c, AOT, Universal cache, PreBoot, Lazy routes, Current user service, Api service

Access token stored with cookies, for Universal cache and Universal cache

## Development server

Run `yarn install` or `npm install`
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `npm run build` to build the project. 
To serve build use `npm run serve`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Tools

Use for universal check: `@Inject('isBrowser') public isBrowser: boolean for universal`

Use for lazy routes: `{path: 'home', loadChildren: 'app/home/home.module#HomeModule', }`
