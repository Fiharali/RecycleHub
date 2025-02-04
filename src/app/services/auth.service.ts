
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:3000/';

  http = inject(HttpClient);


  signup(user: any): Observable<any> {
    return this.checkEmailExists(user.email).pipe(
      switchMap(emailExists => {
        if (emailExists) {
          return throwError(() => new Error('Email already exists'));
        }
        return this.hashPassword(user.password).pipe(
          switchMap(hashedPassword => {
            const userToCreate = {
              ...user,
              role: 'individual',
              password: hashedPassword
            };

            return this.http.post<any>(this.apiUrl +"users" , userToCreate).pipe(
              map(createdUser => {
                this.storeUserInfo(createdUser);
                return createdUser;
              }),
              catchError(error => {
                console.error('Signup error', error);
                return throwError(() => new Error('Signup failed'));
              })
            );
          })
        );
      }),
      catchError(error => {
        console.error('Signup process error', error);
        return throwError(() => error);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}users?email=${email}`).pipe(
      switchMap(users => {
        if (users.length === 0) {
          return throwError(() => new Error('User not found'));
        }

        const user = users[0];

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
          return throwError(() => new Error('Invalid password'));
        }

        this.storeUserInfo(user);

        return of(user);
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => error);
      })
    );
  }


  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}users?email=${email}`).pipe(
      map(users => users.length > 0),
      catchError(error => {
        console.error('Error checking email', error);
        return throwError(() => new Error('Error checking email'));
      })
    );
  }

  hashPassword(password: string): Observable<string> {
    return of(bcrypt.hashSync(password, 10));
  }



  storeUserInfo(user: any): void {
    const { password, ...userToStore } = user;
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    localStorage.setItem('isAuthenticated', 'true');
  }


  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }


  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  }

}
