import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('auth_token');

    // Define public (unauthenticated) endpoints
    const publicUrls = [
      '/api/register',
      '/api/login'
    ];

    // Skip token if request URL ends with any of the public URLs
    const isPublic = publicUrls.some(url => {
        console.log(req.url);
        console.log(url);
        req.url.endsWith(url)});


    if (token && !isPublic) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}