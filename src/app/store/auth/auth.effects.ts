import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  storeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.storeUser),
      tap(({ user }) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
      })
    ),
    { dispatch: false }
  );

  clearUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.clearUser),
      tap(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
