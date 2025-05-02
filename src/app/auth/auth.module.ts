import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SignInComponent,
    RegisterComponent
  ]
})
export class AuthModule { }