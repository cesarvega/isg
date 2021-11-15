import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, params: HttpParams = new HttpParams(), headers: any = null): Observable<T> {
    return this.http.get<T>(url, { headers: headers, params: params});
  }

  post<T, D>(url: string, data: D, headers: any = null): Observable<T> {
    return this.http.post<T>(url, data, { headers: headers });
  }

  put<T, D>(url: string, data: D, headers: any = null): Observable<T> {
    return this.http.put<T>(url, data, {
      headers: headers,
    });
  }

  delete<T>(url: string, headers: any = null, ): Observable<T> {
    return this.http.delete<T>(url, {
      headers: headers,
    });
  }
}
