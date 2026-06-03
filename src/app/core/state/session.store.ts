import { Injectable, signal } from '@angular/core';
import { Side, RegionKey } from '../data/symptoms.data';

export type BodyType = 'male' | 'female';

export interface Pin {
  id: string;
  x: number;
  y: number;
  side: Side;
  region: RegionKey;
  symptoms: string[];   // symptom ids
  duration: string;     // duration id ('' = unset)
  severity: number;     // 1–10
}

export interface UserInfo {
  allergies: string;
  medications: string;
  history: string;
}

@Injectable({ providedIn: 'root' })
export class SessionStore {
  readonly bodyType = signal<BodyType | null>(null);
  readonly pins = signal<Pin[]>([]);
  readonly userInfo = signal<UserInfo>({ allergies: '', medications: '', history: '' });

  setBodyType(type: BodyType): void {
    this.bodyType.set(type);
  }

  setUserInfo(patch: Partial<UserInfo>): void {
    this.userInfo.update((u) => ({ ...u, ...patch }));
  }

  addPin(pin: Omit<Pin, 'id'>): string {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    this.pins.update((list) => [...list, { ...pin, id }]);
    return id;
  }

  updatePin(id: string, patch: Partial<Pin>): void {
    this.pins.update((list) =>
      list.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
  }

  removePin(id: string): void {
    this.pins.update((list) => list.filter((p) => p.id !== id));
  }

  clearPins(): void {
    this.pins.set([]);
  }

  reset(): void {
    this.bodyType.set(null);
    this.pins.set([]);
    this.userInfo.set({ allergies: '', medications: '', history: '' });
  }
}

