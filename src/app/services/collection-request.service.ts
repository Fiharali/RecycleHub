
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

  getUserCollectionRequests(userId: number): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}?userId=${userId}`);
  }


  getCollectionRequests(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}`);
  }

  getCollectionRequestsWithStatusPending(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}?status=pending`);
  }
  addCollectionRequest(request: CollectionRequest): Observable<CollectionRequest> {
    return this.http.post<CollectionRequest>(this.apiUrl, request);
  }


  deleteCollectionRequest(id: number|string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  updateCollectionRequest(id: string | undefined, updatedRequest: { status: string; id?: string; userId: string | number; wasteType: string; photos?: [string, ...string[]]; estimatedWeight: number; collectionAddress: string; desiredDate: string; desiredTimeSlot: string; notes?: string; }) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedRequest);
  }

}
