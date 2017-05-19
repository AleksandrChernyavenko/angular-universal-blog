// angular
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

// libs
import { Cache, CacheValue } from '../../core';

export class MemoryCacheService implements Cache {
  private get isEnabled(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private memoryStorage: Map<string, CacheValue>;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
    if (!this.isEnabled)
      throw new Error('MemoryCacheService is not supported outside `browser` platform!');

    this.memoryStorage = new Map<string, CacheValue>();
  }

  get keys(): Array<string> {
    if (!this.isEnabled)
      return undefined;

    return Array.from(this.memoryStorage.keys());
  }

  setItem(key: string, value: CacheValue): boolean {
    if (!this.isEnabled)
      return false;

    this.memoryStorage.set(key, value);
    return true;
  }

  getItem(key: string): CacheValue {
    if (!this.isEnabled)
      return undefined;

    return this.memoryStorage.get(key);
  }

  removeItem(key: string): void {
    if (!this.isEnabled)
      return;

    this.memoryStorage.delete(key);
  }

  clear(): void {
    if (!this.isEnabled)
      return;

    this.memoryStorage.clear();
  }
}
