// angular
import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';

// libs
import { Cache, CacheValue, STORAGE, Storage } from '../../core';

@Injectable()
export class FsCacheService implements Cache {
  private fsStorage: Storage;

  private get isEnabled(): boolean {
    if (!isPlatformServer(this.platformId)) {
      return false;
    }

    try {
      this.fsStorage.setItem('test', 'test');
      this.fsStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any,
              private readonly injector: Injector) {
    if (!isPlatformServer(platformId)) {
      throw new Error('FsCacheService is not supported outside `server` platform!');
    }

    this.fsStorage = injector.get(STORAGE);
  }

  get keys(): Array<string> {
    if (!this.isEnabled) {
      return undefined;
    }

    return this.fsStorage.keys;
  }

  setItem(key: string, value: CacheValue): boolean {
    if (!this.isEnabled) {
      return false;
    }

    try {
      this.fsStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key: string): CacheValue {
    if (!this.isEnabled) {
      return undefined;
}

    let value = this.fsStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  removeItem(key: string): void {
    if (!this.isEnabled) {
      return;
    }

    this.fsStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isEnabled) {
      return;
    }

    this.fsStorage.clear();
  }
}
