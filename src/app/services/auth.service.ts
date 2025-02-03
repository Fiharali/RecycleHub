
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:3000/';

  http = inject(HttpClient);


  signup(user: any): Observable<any> {
    const { id, ...userToCreate } = user;

    return this.http.post<any>(this.apiUrl+"users", userToCreate).pipe(
      map((createdUser: any) => {
        this.storeUserInfo(createdUser);
        return createdUser;
      })
    );
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
