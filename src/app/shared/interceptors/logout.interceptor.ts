import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { logoutUserSuccess } from '../actions/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.error(
          'FUNCTIONAL INTERCEPTOR: Unauthorized request. Logging out.',
          error
        );

        store.dispatch(logoutUserSuccess());
      }

      return throwError(() => error);
    })
  );
};
