import {
  Headers, RequestOptionsArgs, Response, Http, URLSearchParams,
} from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { CacheService } from '../core/universal-cache/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

const baseUrl: string = environment.apiUrl;

@Injectable()
export class BaseHttpService {

  private static generateUrl(url) {
    return `${baseUrl}/${url}`;
  }

  // Map data
  private static extractData(res: Response) {

    res = res.json();
    return res;
  }
  constructor(@Inject('isBrowser') private isBrowser: boolean,
              @Inject('CookieService') private cookie,
              private readonly cache: CacheService,
              private http: Http) {
  }

  public get(url: string, options?: RequestOptionsArgs) {
    const requestUrl = BaseHttpService.generateUrl(url);
    options = this.prepareRequest(options);
    if (this.isBrowser && this.cache.has(requestUrl)) {
      let obs = Observable.of(this.cache.get(requestUrl));
      this.cache.remove(requestUrl);
      return obs;
    }

    return this.http
      .get(requestUrl, options)
      .map(BaseHttpService.extractData)
      .do((json) => {
        if (!this.isBrowser) {
          this.cache.set(requestUrl, json);
        }
      })
      .catch((err: any) => {
        return this.handleError(err);
      });
  }

  public post(url: string, body: any, options?: RequestOptionsArgs) {
    options = this.createAuthorizationHeader(options);
    return this.http
      .post(BaseHttpService.generateUrl(url), body, options)
      .map(BaseHttpService.extractData)
      .catch((err: any) => {
        return this.handleError(err);
      });
  }

  public put(url: string, body: any, options?: RequestOptionsArgs) {
    options = this.createAuthorizationHeader(options);
    return this.http
      .put(BaseHttpService.generateUrl(url), body, options)
      .map(BaseHttpService.extractData)
      .catch((err: any) => {
        return this.handleError(err);
      });
  }

  public delete(url: string, options?: RequestOptionsArgs) {
    options = this.createAuthorizationHeader(options);
    return this.http
      .delete(BaseHttpService.generateUrl(url), options)
      .map(BaseHttpService.extractData)
      .catch((err: any) => {
        return this.handleError(err);
      });
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs) {
    options = this.createAuthorizationHeader(options);
    return this.http
      .patch(BaseHttpService.generateUrl(url), body, options)
      .map(BaseHttpService.extractData)
      .catch((err: any) => {
        return this.handleError(err);
      });
  }

  public head(url: string, options?: RequestOptionsArgs) {
    options = this.createAuthorizationHeader(options);
    return this.http
      .head(BaseHttpService.generateUrl(url), options)
      .map(BaseHttpService.extractData)
      .catch((err: any) => {
        return this.handleError(err);
      });
  }

  public options(url: string, options?: RequestOptionsArgs) {
    options = this.createAuthorizationHeader(options);
    return this.http
      .options(BaseHttpService.generateUrl(url), options)
      .map(BaseHttpService.extractData)
      .catch((err: any) => {
        return this.handleError(err);
      });
  }

  private createAuthorizationHeader(options: RequestOptionsArgs = {}) {
    if (!options.headers) {
      options.headers = new Headers();
    }

    options.headers.append(
      'Authorization',
      this.cookie.get('accessToken')
    );

    return options;
  }

  private handleError(err): Observable<any> {
    if (!this.isBrowser) {
      return Observable.empty();
    }
    if (err.status >= 500) {
      this.handleServerError();
      return Observable.throw(null);
    }
    switch (err.status) {
      case 401:
        this.handleUnauthorized();
        break;
      case 404:
        this.handleNotFound();
        break;
      default:
        break;
    }
    return Observable.throw(err);
  }

  private handleNotFound() { }

  private handleUnauthorized() { }

  private handleServerError() { }

  private prepareRequest(options: RequestOptionsArgs = {}) {
    if (options.params) {
      options.params = this.prepareUrlParams(options.params);
    }
    options = this.createAuthorizationHeader(options);

    return options;
  }

  private prepareUrlParams(options) {
    if (options instanceof URLSearchParams) {
      return options;
    }

    const params = new URLSearchParams();

    Object.keys(options).map((key) => {
      params.set(key, options[key]);
    });

    return params;
  }

}
