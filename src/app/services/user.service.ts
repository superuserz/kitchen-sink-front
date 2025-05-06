import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

   deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/members/${userId}`, { withCredentials: true });
  }

  searchMembers(criteria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/members/search`, criteria, { withCredentials: true });
  }
}