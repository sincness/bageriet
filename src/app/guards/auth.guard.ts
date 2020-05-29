import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
          // logget ind, så den er true
          return true;
      }

      // ikke logget ind, så redirecter til login siden
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;

  }

}
