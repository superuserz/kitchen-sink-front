import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterMemberRequest } from '../models/user.model';


export function strictEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value || '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? null : { invalidEmailFormat: true };
  };
}

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
  customErrorExists:boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, strictEmailValidator()]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[6-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.isEmailTaken = false;
    this.submitted = !this.submitted;
    this.submitted = true;
    if (this.registerForm.invalid || this.customErrorExists) {
      return;
    }
  
    // Map form values to the expected request format
    const formValue = this.registerForm.value;
    const registerRequest: RegisterMemberRequest = {
      name: formValue.name.trim(),
      email: formValue.email.trim(),
      phoneNumber: formValue.phoneNumber.trim(),
      password: formValue.password
    };
  
    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.registerSuccess = true;
        this.customErrorExists = false;
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
    if(/[A-Z]/.test(this.f.password.value)) {
      this.customErrorExists = false;
      return true;
    }
    this.customErrorExists = true;
    return false;
  }
  
  hasPasswordLowercase(): boolean {
    if(/[a-z]/.test(this.f.password.value)) {
      this.customErrorExists = false;
      return true;
    }
    this.customErrorExists = true;
    return false;
  }

  hasNameOnlyLetters(): boolean {
    const name = (this.f.name.value || '').trim();
    const isValid = /^[A-Za-z\s]+$/.test(name);
    this.customErrorExists = !isValid;
    return isValid;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  preventAction(event: ClipboardEvent): void {
    event.preventDefault();
  }
}