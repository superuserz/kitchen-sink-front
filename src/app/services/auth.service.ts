import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterMemberRequest, User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private token = 'auth_token';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, credentials);
  }

  register(registerRequest: RegisterMemberRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/member/register`, registerRequest);
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/member/me`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/members`);
  }

  getToken(): string | null {
    return this.cookieService.check(this.token)
      ? this.cookieService.get(this.token)
      : null;
  }

  private getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64Payload = token.split('.')[1];
      return JSON.parse(atob(base64Payload));
    } catch (e) {
      console.error('Failed to parse JWT payload:', e);
      return null;
    }
  }

  getEmail(): string | null {
    return this.getPayload()?.sub ?? null;
  }

  getRoles(): string[] {
    return this.getPayload()?.roles ?? [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN');
  }

  isAuthenticated(): boolean {
    const payload = this.getPayload();
    if (!payload) return false;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  }

  logout(): void {
      this.cookieService.delete('auth_token', '/');  // Delete the JWT cookie
        // Clear other in-memory state (if any), then route
        this.router.navigate(['/sign-in']); 
  }
}