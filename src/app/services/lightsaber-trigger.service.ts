import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightsaberTriggerService {

  private saberStatusSubject = new BehaviorSubject<string>('on');
  saberStatus$ = this.saberStatusSubject.asObservable();

  toggleSaber() {
    const currentStatus = this.saberStatusSubject.value;
    this.saberStatusSubject.next(currentStatus === 'on' ? 'off' : 'on');
  }

  setSaberStatus(status: string) {
    this.saberStatusSubject.next(status);
  }

  getSaberStatus() {
    return this.saberStatusSubject.value;
  }
}
