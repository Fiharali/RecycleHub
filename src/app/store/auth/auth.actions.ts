import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';


export const storeUser = createAction(
  '[Auth] Store User',
  props<{ user: User }>()
);


export const clearUser = createAction('[Auth] Clear User');

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);
