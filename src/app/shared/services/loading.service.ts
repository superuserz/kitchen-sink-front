import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private requestCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide(): void {
    this.requestCount = Math.max(this.requestCount - 1, 0);
    if (this.requestCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  reset(): void {
    this.requestCount = 0;
    this.loadingSubject.next(false);
  }
}