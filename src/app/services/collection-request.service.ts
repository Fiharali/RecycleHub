
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../models/collection-request.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {

  private apiUrl = 'http://localhost:3000/collectionRequests';

  constructor(private http: HttpClient) { }

  // getCollectionRequests(userId: number): Observable<CollectionRequest[]> {
  //   return this.http.get<CollectionRequest[]>(`${this.apiUrl}?userId=${userId}`);
  // }

  getCollectionRequests(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}`);
  }

  addCollectionRequest(request: CollectionRequest): Observable<CollectionRequest> {
    return this.http.post<CollectionRequest>(this.apiUrl, request);
  }



}
