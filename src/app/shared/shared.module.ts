import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

const components = [];
const providers = [];

@NgModule({
    imports: [
      ...modules
    ],
    declarations: [
      ...components
    ],
    exports: [
      ...modules,
      ...components
    ]
  }
)
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...providers
      ]
    };
  }

}
