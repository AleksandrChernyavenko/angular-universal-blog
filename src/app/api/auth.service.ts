import { Injectable, Injector, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';

const debounceTime = 10;

@Injectable()
export class AuthService {
  public get accessToken(): string {
    return this.cookie.get('accessToken');
  };

  public set accessToken(value: string | null) {
    if (typeof value === 'string') {
      this.cookie.put('accessToken', value);
    } else {
      this.cookie.remove('accessToken');
    }
  };

  public get currentUserId(): string {
    return this.cookie.get('currentUserId');
  };

  public set currentUserId(value: string | null) {
    if (typeof value === 'string') {
      this.cookie.put('currentUserId', value);
    } else {
      this.cookie.remove('currentUserId');
    }
  };

  public get isAuthenticated(): boolean {
    return !!(this.currentUserId && this.accessToken);
  };

  public currentUser: InUser;

  private loadInProgress = false;

  private get users() {
    return this.injector.get(UserService);
  }

  private currentUserSubject: BehaviorSubject<InUser> = new BehaviorSubject(null);
  // Debounce for prevent multiple subscribes
  private currentUserObservable: Observable<InUser> = this.currentUserSubject.asObservable().debounceTime(debounceTime);

  public signUpSubject: Subject<any> = new Subject();
  public signUp: Observable<any> = this.signUpSubject.asObservable();

  public loggedInSubject: Subject<any> = new Subject();
  public loggedIn: Observable<any> = this.loggedInSubject.asObservable();

  public logOutSubject: Subject<any> = new Subject();
  public logOut: Observable<any> = this.logOutSubject.asObservable();

  constructor(private injector: Injector,
              @Inject('CookieService') private cookie) {
    this.getCurrentUser();
  }

  public clearUser() {
    this.accessToken = null;
    this.currentUserId = null;
    this.currentUser = undefined;
  }

  public getCurrentUser(): Observable<InUser> {
    if (!this.currentUser && this.isAuthenticated && !this.loadInProgress) {
      this.loadInProgress = true;
      this.users
        .getUser(this.currentUserId)
        .subscribe((userData: InUser) => {
          this.currentUser = userData;
          this.currentUserSubject.next(this.currentUser);
        });
    }
    return this.currentUserObservable;
  }

  public login(data) {
    return this.users.login(data);
  }

  public logout() {
    return this.users.logout();
  }

  public setUser(userData, accessToken?: string, currentUserId?: string) {
    if (accessToken) {
      this.accessToken = accessToken;
    }
    if (currentUserId) {
      this.currentUserId = currentUserId;
    }
    this.currentUser = Object.assign({}, this.currentUser, userData);
    this.currentUserSubject.next(this.currentUser);
  }
}
