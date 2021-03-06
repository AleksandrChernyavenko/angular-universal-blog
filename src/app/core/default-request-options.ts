import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
}
