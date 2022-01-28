import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { SYSTEM_CONFIG } from '@nx/isgcrm/config';

const httpOptions = {
  headers: new HttpHeaders({ 'accept': 'application/ld+json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
    
    formData!: any;
  // login, register

    requestToken() {
        let body = {
            "user": '',
            "password": ''
        };

        if( localStorage.getItem('user') ){
            let userObj: any = localStorage.getItem('user');
            let decriptedUser = atob( JSON.parse(userObj ) );
            userObj =  JSON.parse( decriptedUser );

            this.formData = new FormData();
            this.formData = new FormGroup({
                user: new FormControl( userObj.user ),
                password: new FormControl( userObj.password )
            });
            body = this.formData.value;
        }
        
        return this.http.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.TOKEN_PATH, body, httpOptions);
    }
}