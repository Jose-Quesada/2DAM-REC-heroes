import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();

  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
   return this.checkAuthStatus();
  }

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthenticacion()
      .pipe(
        tap( isAuthenticated => console.log('Autenticado: ', isAuthenticated)),
        tap( isAuthenticated => {
          if ( ! isAuthenticated ){
            this.router.navigate(['./auth/login'])
          }}),

      )
  }


}
