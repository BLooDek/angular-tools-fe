import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map(({ token }) =>
            AuthActions.loginSuccess({ token, user: username })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      mergeMap(({ username, password }) =>
        this.authService.register({ username, password }).pipe(
          map((user) => AuthActions.registerUserSuccess({ user })),
          catchError((error) => of(AuthActions.registerUserFailure({ error })))
        )
      )
    )
  );
}
