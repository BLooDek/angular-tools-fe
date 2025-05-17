import { createFeature, createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

interface State {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  isLoggedIn: false,
  token: null,
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(authActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    isLoggedIn: true,
    token,
    user,
    loading: false,
  })),
  on(authActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(authActions.registerUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(authActions.registerUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(authActions.registerUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
export const authFeature = createFeature({
  name: 'auth',
  reducer: authReducer,
});
