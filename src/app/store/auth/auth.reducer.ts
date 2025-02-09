import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}


export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null
};


export const authReducer = createReducer(
  initialState,
  on(AuthActions.storeUser, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.clearUser, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error
  })),
  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error
  }))
);
