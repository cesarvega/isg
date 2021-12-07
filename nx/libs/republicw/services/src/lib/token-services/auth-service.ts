import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { SYSTEM_CONFIG } from '@nx/republicw/config';
import { ApiService } from '@nx/republicw/services';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
    
    formData!: any;
  // login, register

  requestToken() {
    this.formData = new FormData();
    this.formData = new FormGroup({
        email: new FormControl(SYSTEM_CONFIG.EMAIL),
        password: new FormControl(SYSTEM_CONFIG.PASSWORD)
    });
    const body = this.formData.value;

    return this.http.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.TOKEN_PATH, body, httpOptions);
  }
}