import { inject, Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CoreEffects {
  private authService: AuthService = inject(AuthService);
  private actions$: Actions = inject(Actions);
  private matSnackbar: any = inject(MatSnackBar);

  showErrror = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerUserFailure),
        tap(({ error }) => {
          console.log('Error:', error);
          this.matSnackbar.open(
            error?.error?.message ?? 'Error has occured',
            'Close',
            {
              duration: 3000,
              panelClass: 'error-snackbar',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        })
      ),
    { dispatch: false }
  );
}
