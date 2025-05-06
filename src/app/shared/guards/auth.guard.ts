import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const http = inject(HttpClient);
  console.log('authGuard');
  const apiUrl = environment.apiUrl;

  return http.get(apiUrl + '/api/member/me', {withCredentials : true}).pipe(
    map(() => true), // user is authenticated
    catchError(() => of(router.createUrlTree(['/sign-in']))) // not authenticated
  );
}
