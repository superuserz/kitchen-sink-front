import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterMemberRequest } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  password: string = '';
  registerSuccess: boolean = false;
  isEmailTaken: boolean = false;
  showPassword = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.isEmailTaken = false;
    this.submitted = !this.submitted;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  
    // Map form values to the expected request format
    const formValue = this.registerForm.value;
    const registerRequest: RegisterMemberRequest = {
      name: formValue.name,    // map "username" form field to "name"
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      password: formValue.password
    };
  
    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.registerSuccess = true;
      },
      error: (err) => {
        if (err.error && err.error.email) {
          this.isEmailTaken = true;
          this.errorMessage = 'User with this email already exists. Want to Login? ';
        } else {
          this.errorMessage = err.error?.message || 'Something went wrong';
          this.registerSuccess = false;
        }
        console.error('Registration failed:', err.error);
      }
    });
  }

  hasPasswordUppercase(): boolean {
    return /[A-Z]/.test(this.f.password.value);
  }
  
  hasPasswordLowercase(): boolean {
    return /[a-z]/.test(this.f.password.value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}