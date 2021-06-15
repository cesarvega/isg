import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://127.0.0.1:8000/api";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) { }
  getAll(endpoint, params = null): Observable<any> {
    return this.http.get(this.concatURL(endpoint), { params });
  }
  get(endpoint, id): Observable<any> {
    return this.http.get(this.concatURL(endpoint, id));
  }
  post(endpoint, data): Observable<any> {
    return this.http.post(this.concatURL(endpoint), data);
  }
  put(endpoint, data): Observable<any> {
    return this.http.put(this.concatURL(endpoint), data);
  }
  patch(endpoint, id, data): Observable<any> {
    return this.http.patch(this.concatURL(endpoint, id), data);
  }
  delete(endpoint, id): Observable<any> {
    return this.http.delete(this.concatURL(endpoint, id));
  }

  private concatURL(endpoint, id = null) {
    let url = `${baseUrl}/${endpoint}`;
    if (id)
      url += `/${id}`;
    return url
  }
}
