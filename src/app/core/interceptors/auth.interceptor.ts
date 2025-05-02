import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }

  private getToken(): string | null {
    // Logic to retrieve the token from local storage or any other storage
    return localStorage.getItem('authToken');
  }
}