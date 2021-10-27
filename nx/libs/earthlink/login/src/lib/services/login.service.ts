import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
//import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
/************************************************ */
import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { ApiService } from '@nx/earthlink/shared';
import { ENDPOINT } from '@nx/earthlink/api';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private apiService: ApiService,
        //private store: Store,
        private router: Router,
    ){ }

    doLogin( data: any, headers: any){
      return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.login, data, headers).pipe(
        map((response: any) => {
          //check if is valid login ( TODO ) and navigate
          this.router.navigate([ENDPOINT.address.navigate]);
          return response;
        }),
        tap((response) => {
          //get the token; validate is the response has it
          //localStorage.setItem('uuid', response.token);
          localStorage.setItem('token', response.token );
          //navigate to offers page
          console.log('logged in');
        })
      ).toPromise();
  
    }

    
}