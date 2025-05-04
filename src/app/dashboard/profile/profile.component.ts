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
    this.authService.getUserProfile().subscribe({
      next: (res) => this.user = res,
      error: (err) => console.error('Failed to load profile:', err)
    });
  }
}
