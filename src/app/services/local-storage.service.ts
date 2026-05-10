import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  setJson<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getJson<T>(key: string): T | null {
    const stored = this.storage.getItem(key);
    return stored === null ? null : (JSON.parse(stored) as T);
  }
}
