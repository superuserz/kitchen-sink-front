import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Role, User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarOpen = true;
  isAdminUser: boolean = false;
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loadUserProfile();

    // Subscribe to user observable to get real-time updates
    this.authService.currentUser$.subscribe(user => {
    this.user = user;
    this.isAdminUser = user?.roles?.includes(Role.ADMIN) ?? false;
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  logout(): void {
    this.authService.logout(); // replace with your actual logic
  }
}
