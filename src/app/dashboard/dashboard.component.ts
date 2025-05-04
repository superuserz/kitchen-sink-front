import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarOpen = true;
  userName = 'Manmeet'; // You can dynamically fetch this from a service

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
