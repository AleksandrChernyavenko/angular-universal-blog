import { Injectable, Inject } from '@angular/core';


@Injectable()
export class CookieNodeService implements InCookieService {
  private get cookies(): {[key: string]: string} {
    return this.req.cookies;
  }

  constructor(@Inject('req') private req: any) {
  }

  public setOptions(options: InCookieOptionsArgs) {
  }

  public get(key: string): string {
    return this.cookies[key];
  }

  public getObject(key: string): {[key: string]: string} {
    return this.cookies;
  }

  public getAll(): {[key: string]: string} {
    return this.cookies;
  }

  public put(key: string, value: string, options?: InCookieOptionsArgs): void {
  }

  public putObject(key: string, value: {[key: string]: string}, options?: InCookieOptionsArgs): void {
  }

  public remove(key: string, options?: InCookieOptionsArgs): void {
  }

  public removeAll(): void {
  }
}
