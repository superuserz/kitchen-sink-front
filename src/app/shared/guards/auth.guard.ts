import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('auth_token');

  return token || !isTokenExpired(token) ? true : router.createUrlTree(['/sign-in']);
};

function isTokenExpired(token: string): boolean {
  console.log('Auth Gaurd activates');
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
    const expiry = payload.exp;

    if (!expiry) return true;

    const now = Math.floor(Date.now() / 1000); // current UNIX timestamp in seconds
    return expiry < now;
  } catch (err) {
    return true; // treat invalid tokens as expired
  }
}
