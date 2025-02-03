
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, user);
  }

  deleteUser(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete`);
  }
}
