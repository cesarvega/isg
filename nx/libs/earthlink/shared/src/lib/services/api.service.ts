import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@nx/earthlink/env';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.apiBaseUrl}${url}`, {
      headers: this.headers,
      params,
    });
  }

  post<T, D>(url: string, data: D, headers: any = null): Observable<T> {
    return this.http.post<T>(url, data, { headers: headers });
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this.http.put<T>(`${environment.apiBaseUrl}${url}`, data, {
      headers: this.headers,
    });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiBaseUrl}${url}`, {
      headers: this.headers,
    });
  }

  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
