import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

import { AuthUser } from './auth.model';

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const authReducer = createReducer(

  initialAuthState,

  on(
    AuthActions.login,
    state => ({
      ...state,
      loading: true,
      error: null
    })
  ),

  on(
    AuthActions.loginSuccess,
    (state, { user }) => ({
      ...state,
      user,
      isAuthenticated: true,
      loading: false,
      error: null
    })
  ),

  on(
    AuthActions.loginFailure,
    (state, { error }) => ({
      ...state,
      user: null,
      isAuthenticated: false,
      loading: false,
      error
    })
  ),

  on(
    AuthActions.logout,
    () => initialAuthState
  ),
  on(
  AuthActions.logoutSuccess,
  state => ({
    ...state,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  })
)
);