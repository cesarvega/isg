import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://127.0.0.1:8000/api";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) { }
  getAll(endpoint): Observable<any> {
    return this.http.get(`${baseUrl}/${endpoint}`);
  }
  get(endpoint,id): Observable<any> {
    return this.http.get(`${baseUrl}/${endpoint}/${id}`);
  }
  post(endpoint,data): Observable<any> {
    return this.http.post(`${baseUrl}/${endpoint}`, data);
  }
  update(endpoint,id, data): Observable<any> {
    return this.http.put(`${baseUrl}${endpoint}/${id}`, data);
  }
  delete(endpoint,id): Observable<any> {
    return this.http.delete(`${baseUrl}/${endpoint}/${id}`);
  }
}