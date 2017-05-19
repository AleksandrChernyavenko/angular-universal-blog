export class CookieOptions {
  public path: string;
  public domain: string;
  public expires: string|Date;
  public secure: boolean;

  constructor({path, domain, expires, secure}: InCookieOptionsArgs = {}) {
    this.path = this.isPresent(path) ? path : null;
    this.domain = this.isPresent(domain) ? domain : null;
    this.expires = this.isPresent(expires) ? expires : null;
    this.secure = this.isPresent(secure) ? secure : false;
  }

  public merge(options?: InCookieOptionsArgs): CookieOptions {
    return new CookieOptions(<InCookieOptionsArgs>{
      path: this.isPresent(options) && this.isPresent(options.path) ? options.path : this.path,
      domain: this.isPresent(options) && this.isPresent(options.domain) ? options.domain : this.domain,
      expires: this.isPresent(options) && this.isPresent(options.expires) ? options.expires : this.expires,
      secure: this.isPresent(options) && this.isPresent(options.secure) ? options.secure : this.secure,
    });
  }

  private isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }
}
