import { inject, Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private authService: AuthService = inject(AuthService);
  private actions$: Actions = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map(({ token }) => AuthActions.loginSuccess({ token, user: email })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      mergeMap(({ email, password }) =>
        this.authService.register({ email, password }).pipe(
          map((res) => AuthActions.registerUserSuccess(res)),
          catchError((error) => of(AuthActions.registerUserFailure({ error })))
        )
      )
    )
  );
}
