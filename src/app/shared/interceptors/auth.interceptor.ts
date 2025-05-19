import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { exhaustMap, take, withLatestFrom } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { authFeature } from '../reducers/auth.reducer';
import { inject } from '@angular/core';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const store = inject(Store);

  return store.select(authFeature.selectIsLoggedIn).pipe(
    withLatestFrom(store.select(authFeature.selectToken)),
    take(1),
    exhaustMap(([isLoggedIn, token]) => {
      if (isLoggedIn && token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(authReq);
      }
      return next(req);
    })
  );
}
