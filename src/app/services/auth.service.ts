import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterMemberRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:8081'; // Replace with your backend API URL
  private apiUrl = 'https://kitchensink-backend-b9ame2g6bddnaee7.centralindia-01.azurewebsites.net/';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, credentials);
  }

  register(registerRequest: RegisterMemberRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, registerRequest);
  }
}