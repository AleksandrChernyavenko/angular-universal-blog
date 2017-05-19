import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { BaseHttpService } from './base-http.service';
import { UserService } from './user.service';

@NgModule({
  providers: [
    ApiService,
    AuthService,
    BaseHttpService,
    UserService
  ]
})
export class ApiModule { }
