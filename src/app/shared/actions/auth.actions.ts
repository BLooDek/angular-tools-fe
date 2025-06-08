import { createAction, props } from '@ngrx/store';

export const loginUser = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[Auth] Login Success',
  props<{ email: string; name?: string }>()
);

export const loginUserFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const registerUser = createAction(
  '[Auth] Register',
  props<{ password: string; email: string }>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register Success',
  props<{ email: string; name?: string }>()
);

export const registerUserFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);
export const logoutUser = createAction('[Auth] Logout');

export const logoutUserSuccess = createAction('[Auth] Logout Success');

export const logoutUserFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);

export const checkToken = createAction('[Auth] Check Token');
export const checkTokenSuccess = createAction(
  '[Auth] Check Token Success',
  props<{ email: string; name?: string }>()
);
export const checkTokenFailure = createAction(
  '[Auth] Check Token Failure',
  props<{ error: any }>()
);
