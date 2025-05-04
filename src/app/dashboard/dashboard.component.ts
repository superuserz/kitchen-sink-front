import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarOpen = true;
  isAdminUser: boolean = false;
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
     this.isAdminUser = this.authService.isAdmin();
     this.authService.getUserProfile().subscribe({
      next: (res) => this.user = res,
      error: (err) => console.error('Failed to load profile:', err)
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  logout(): void {
    this.authService.logout(); // replace with your actual logic
  }
}
