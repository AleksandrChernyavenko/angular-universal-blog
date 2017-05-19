import { Injectable, Injector } from '@angular/core';

import { AuthService } from './auth.service';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class UserService {
  private get auth(): any {
    return this.injector.get(AuthService);
  }

  constructor(private http: BaseHttpService,
              private injector: Injector) {
  }

  public create(data) {
    return this.http
      .post('', data)
      .do((response: any) => {
        this.authHandler({
          data: {},
          token: '',
          id: ''
        });
        this.auth.signUpSubject.next();
      });
  }

  public getUser(userId) {
    return this.http
      .get('');
  }

  public login(data) {
    return this.http
      .post('', data)
      .do((response: any) => {
        this.authHandler({
          data: {},
          token: '',
          id: ''
        });
        this.auth.loggedInSubject.next();
      });
  }

  public logout() {
    if (this.auth.isAuthenticated) {
      return this.http
        .post('', null)
        .subscribe(() => {
          this.auth.clearUser();
          this.auth.logOutSubject.next();
        }, () => this.auth.clearUser());
    } else {
      this.auth.clearUser();
      this.auth.logOutSubject.next();
    }
  }

  private authHandler({data, token, id}) {
    if (data && token && id) {
      this.auth.setUser(data, token, id);
    }
  }
}
