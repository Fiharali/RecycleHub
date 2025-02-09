import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private currentUser$: Observable<User | null>;
  private isAuthenticated$: Observable<boolean>;
  private error$: Observable<string | null>;

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(AuthSelectors.selectUser);
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }



  storeUser(user: User): void {
    this.store.dispatch(AuthActions.storeUser({ user }));
  }

  clearUser(): void {
    this.store.dispatch(AuthActions.clearUser());
  }

  loginSuccess(user: User): void {
    this.store.dispatch(AuthActions.loginSuccess({ user }));
  }

  loginFailure(error: string): void {
    this.store.dispatch(AuthActions.loginFailure({ error }));
  }

  signupSuccess(user: User): void {
    this.store.dispatch(AuthActions.signupSuccess({ user }));
  }

  signupFailure(error: string): void {
    this.store.dispatch(AuthActions.signupFailure({ error }));
  }
}
