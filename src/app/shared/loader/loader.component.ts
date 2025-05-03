import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loader',
  template: `
    <div class="modern-loader-overlay" *ngIf="loading$ | async">
      <div class="modern-spinner"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
