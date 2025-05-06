import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterMemberRequest, User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, credentials, { withCredentials: true }).pipe(
      tap(() => this.loadUserProfile()) // Load user after login
    );
  }

  register(registerRequest: RegisterMemberRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/member/register`, registerRequest, { withCredentials: true });
  }

  loadUserProfile(): void {
    this.http.get<User>(`${this.apiUrl}/api/member/me`, { withCredentials: true }).subscribe({
      next: (user) => this.currentUserSubject.next(user),
      error: () => this.currentUserSubject.next(null)
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/members`, { withCredentials: true });
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles?.includes('ADMIN') ?? false;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  logout(): void {
    // Optional: call logout API to delete cookie on server too
    this.currentUserSubject.next(null);
    this.router.navigate(['/sign-in']);
  }
}