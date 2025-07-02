import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';

import { logoutUserSuccess } from '../actions/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.error(
          'FUNCTIONAL INTERCEPTOR: Unauthorized request. Logging out.'
        );

        store.dispatch(logoutUserSuccess());
      }

      return throwError(() => error);
    })
  );
};
