import { createAction, props } from '@ngrx/store';
import { RegisterResponse } from '../models/auth.interface';

export const loginUser = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: any }>()
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
  props<RegisterResponse>()
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
