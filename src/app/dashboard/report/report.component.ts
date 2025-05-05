import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  constructor(private reportService: ReportService) {}

  downloadReport() {
    this.reportService.download().subscribe({
      next: (data: any) => {
        if (data?.data != null) {
          const blob = new Blob([data.data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
    
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = data.filename || 'report.dat';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        } else {
          console.warn('No content in the response');
        }
      },
      error: (err: any) => {
        console.error('Error while downloading report', err);
      }
    });
  }
}
