import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarOpen = true;
  userName: string = '';
  isAdminUser: boolean = false;

  constructor(private authContext: AuthService) {}

  ngOnInit(): void {
    // Get user's email and role
    this.userName = this.authContext.getEmail() ?? 'Guest';
    this.isAdminUser = this.authContext.isAdmin();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
