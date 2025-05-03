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

  password: string = '';
  registerSuccess: boolean = false;

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
        console.error('Registration failed:', err);
      }
    });
  }

  hasPasswordUppercase(): boolean {
    return /[A-Z]/.test(this.f.password.value);
  }
  
  hasPasswordLowercase(): boolean {
    return /[a-z]/.test(this.f.password.value);
  }
}