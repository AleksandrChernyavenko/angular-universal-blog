// angular
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

// libs
import { Cache, CacheValue } from '../../core';

export class LocalStorageCacheService implements Cache {
  private get isEnabled(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
    if (!isPlatformBrowser(platformId)) {
      throw new Error('LocalStorageCacheService is not supported outside `browser` platform!');
    }
  }

  get keys(): Array<string> {
    if (!this.isEnabled) {
      return undefined;
    }

    const res: Array<string> = [];

    Object.keys(localStorage).forEach((key: string) => {
      res.push(key);
    });

    return res;
  }

  setItem(key: string, value: CacheValue): boolean {
    if (!this.isEnabled) {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key: string): CacheValue {
    if (!this.isEnabled) {
      return undefined;
    }

    let value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  removeItem(key: string): void {
    if (!this.isEnabled) {
      return;
    }

    localStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isEnabled) {
      return;
    }

    localStorage.clear();
  }
}
