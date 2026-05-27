import { Injectable, signal } from '@angular/core';

export type BodyType = 'male' | 'female';

@Injectable({ providedIn: 'root' })
export class SessionStore {
  readonly bodyType = signal<BodyType | null>(null);

  setBodyType(type: BodyType): void {
    this.bodyType.set(type);
  }
}