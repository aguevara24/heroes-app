import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, tap } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

const checkAuthStatus = (): boolean | Observable<boolean> => {

  const authService = inject( AuthService );
  const router = inject( Router );

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if ( !isAuthenticated ) {
          router.navigate( ['./auth/login' ] );
        }
      })
    );
}
export const canActivatedGuard: CanActivateFn = (
  route,
  state) => {
  // console.log('CanActivate');
  // console.log({ route, state });
  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = (
  route,
  segments) => {
  // console.log('CanMatch');
  // console.log({ route, segments });
  return checkAuthStatus();
};
