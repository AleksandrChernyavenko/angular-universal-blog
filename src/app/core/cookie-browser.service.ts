import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { CookieOptions } from './cookie-options';

@Injectable()
export class CookieBrowserService implements InCookieService {
  private defaultOptions: CookieOptions;

  constructor(@Inject(DOCUMENT) private document: any) {
  }

  public setOptions(options: InCookieOptionsArgs) {
    this.defaultOptions = new CookieOptions(options);
  }

  public get(key: string): string {
    return (<any>this.cookieReader())[key];
  }

  public getObject(key: string): { [key: string]: string } {
    let value = this.get(key);
    return value ? JSON.parse(value) : value;
  }

  public getAll(): { [key: string]: string } {
    return <any>this.cookieReader();
  }

  public put(key: string, value: string, options?: InCookieOptionsArgs): void {
    this.cookieWriter()(key, value, options);
  }

  public putObject(key: string, value: Object, options?: InCookieOptionsArgs) {
    this.put(key, JSON.stringify(value), options);
  }

  public remove(key: string, options?: InCookieOptionsArgs): void {
    this.cookieWriter()(key, undefined, options);
  }

  public removeAll(): void {
    let cookies = this.getAll();
    Object.keys(cookies).forEach(key => {
      this.remove(key);
    });
  }

  private cookieReader(): Object {
    let rawDocument = this.document;
    let lastCookies = {};
    let lastCookieString = '';
    let that = this;

    let cookieArray: string[], cookie: string, i: number, index: number, name: string;
    let currentCookieString = rawDocument.cookie || '';
    if (currentCookieString !== lastCookieString) {
      lastCookieString = currentCookieString;
      cookieArray = lastCookieString.split('; ');
      lastCookies = {};
      for (i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
        index = cookie.indexOf('=');
        if (index > 0) {
          name = that.safeDecodeURIComponent(cookie.substring(0, index));
          if (this.isBlank((<any>lastCookies)[name])) {
            (<any>lastCookies)[name] = that.safeDecodeURIComponent(cookie.substring(index + 1));
          }
        }
      }
    }
    return lastCookies;
  }

  private cookieWriter() {
    let that = this;
    let rawDocument = this.document;

    return function (name: string, value: string, options?: InCookieOptionsArgs) {
      rawDocument.cookie = that.buildCookieString(name, value, options);
    };
  }

  private safeDecodeURIComponent(str: string) {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }

  private buildCookieString(name: string, value: string, options?: InCookieOptionsArgs): string {
    let cookiePath = '/';
    let path: string, expires: any;
    let defaultOpts = this.defaultOptions || new CookieOptions(<InCookieOptionsArgs>{path: cookiePath});
    let opts: CookieOptions = this.mergeOptions(defaultOpts, options);
    expires = opts.expires;
    if (this.isBlank(value)) {
      expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
      value = '';
    }
    if (this.isString(expires)) {
      expires = new Date(expires);
    }

    let str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    str += opts.path ? ';path=' + opts.path : '';
    str += opts.domain ? ';domain=' + opts.domain : '';
    str += expires ? ';expires=' + expires.toUTCString() : '';
    str += opts.secure ? ';secure' : '';

    let cookieLength = str.length + 1;
    if (cookieLength > 4096) {
      console.log(`Cookie \'${name}\' possibly not set or overflowed because it was too
       large (${cookieLength} > 4096 bytes)!`);
    }
    return str;
  }

  private mergeOptions(defaultOpts: CookieOptions, providedOpts?: InCookieOptionsArgs): CookieOptions {
    let newOpts = defaultOpts;
    if (this.isPresent(providedOpts)) {
      return newOpts.merge(new CookieOptions(providedOpts));
    }
    return newOpts;
  }

  private isBlank(obj: any): boolean {
    return obj === undefined || obj === null;
  }

  private isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }

  private isString(obj: any): obj is string {
    return typeof obj === 'string';
  }
}
