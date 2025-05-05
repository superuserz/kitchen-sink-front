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
  loginFailed: boolean = false;
  submitted: boolean = false;
  signInForm: FormGroup;
  showPassword = false;
  tooManyRequests = false;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private authService: AuthService, private router: Router) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  onLogin() {
    this.submitted = true;
    
    if (this.signInForm.invalid) {
      return;
    }

    if (this.signInForm.invalid) return;
    this.loginFailed = false;
    this.tooManyRequests = false;

    const credentials = this.signInForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.cookieService.set('auth_token', response.token, { path: '/' }); // Store JWT in cookie
        this.router.navigate(['/dashboard']); // Navigate to dashboard
      },
      error: (err) => {
        if(err.status === 429) {
          this.tooManyRequests = true;
        } else if(err.status === 401) {
          this.loginFailed = true;
        }
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}