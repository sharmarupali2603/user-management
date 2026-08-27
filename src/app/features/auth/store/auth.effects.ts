import { Injectable, inject } from '@angular/core';

import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';

import {
  map,
  tap
} from 'rxjs';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(

      ofType(AuthActions.login),

      map(({ credentials }) => {

        const isValid =
          credentials.username === 'admin' &&
          credentials.password === 'admin123';

        if (isValid) {

          return AuthActions.loginSuccess({
            user: {
              username: credentials.username
            }
          });

        }

        return AuthActions.loginFailure({
          error: 'Invalid username or password.'
        });

      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(

        ofType(AuthActions.loginSuccess),

        tap(({ user }) => {

          localStorage.setItem(
            'auth_user',
            JSON.stringify(user)
          );

        })
      ),
    {
      dispatch: false
    }
  );

 logout$ = createEffect(() =>
    this.actions$.pipe(

      ofType(AuthActions.logout),

      map(() => {

        localStorage.removeItem(
          'auth_user'
        );

        return AuthActions.logoutSuccess();

      })

    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(

        ofType(AuthActions.logoutSuccess),

        tap(() => {

          this.router.navigate(['/login']);

        })

      ),
    {
      dispatch: false
    }
  );

}