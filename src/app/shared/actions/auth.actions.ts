import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const registerUser = createAction(
  '[Auth] Register',
  props<{ username: string; password: string; email: string }>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: any }>()
);

export const registerUserFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);
