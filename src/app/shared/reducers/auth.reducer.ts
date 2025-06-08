import { createFeature, createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

interface State {
  isLoggedIn: boolean;
  error: string | null;
  name: string | null;
  email: string | null;
  loading: boolean;
}

const initialState: State = {
  isLoggedIn: false,
  error: null,
  name: null,
  email: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.loginUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    authActions.loginUserSuccess,
    authActions.registerUserSuccess,
    authActions.checkTokenSuccess,
    (state, { email, name }) => ({
      ...state,
      isLoggedIn: true,
      email,
      name: name || null,
      loading: false,
    })
  ),

  on(authActions.registerUser, (state) => ({
    ...state,
    loading: true,
    error: null,
    isLoggedIn: false,
    user: null,
  })),

  on(
    authActions.registerUserFailure,
    authActions.loginUserFailure,
    authActions.logoutUserFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(authActions.logoutUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(authActions.logoutUserSuccess, (state) => ({
    ...state,
    isLoggedIn: false,
    email: null,
    name: null,
    loading: false,
    error: null,
  }))
);
export const authFeature = createFeature({
  name: 'auth',
  reducer: authReducer,
});
