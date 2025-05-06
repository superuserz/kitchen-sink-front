import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}



  ngOnInit(): void {
    this.authService.loadUserProfile();

    // Subscribe to user observable to get real-time updates
    this.authService.currentUser$.subscribe(user => {
    this.user = user;
  });
  }
}
