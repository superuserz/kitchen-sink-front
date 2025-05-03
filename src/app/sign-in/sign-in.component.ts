import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private authService: AuthService, private router: Router) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.signInForm.invalid) return;

    const credentials = this.signInForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.cookieService.set('token', response.token); // Store JWT in cookie
        this.router.navigate(['/dashboard']); // Navigate to dashboard
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}