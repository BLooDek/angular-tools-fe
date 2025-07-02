import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

/**
 * Functional interceptor to add withCredentials: true to every outgoing request.
 * This ensures that cookies are sent with every API call.
 */
export const credentialsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Clone the request and set the withCredentials property to true.
  // HttpRequests are immutable, so we must clone them to make changes.
  const reqWithCredentials = req.clone({
    withCredentials: true,
  });

  // Pass the cloned request with the updated header to the next handler.
  return next(reqWithCredentials);
};
