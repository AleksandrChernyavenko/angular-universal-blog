interface InCookieService {
  setOptions(options: InCookieOptionsArgs);

  get(key: string): string;

  getObject(key: string): {
    [key: string]: string
  };

  getAll(): {
    [key: string]: string
  };

  put(key: string, value: string, options?: InCookieOptionsArgs): void;

  putObject(key: string, value: {[key: string]: string}, options?: InCookieOptionsArgs): void;

  remove(key: string, options?: InCookieOptionsArgs): void;

  removeAll(): void;
}
