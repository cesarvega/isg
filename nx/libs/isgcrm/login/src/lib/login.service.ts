import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

import { ApiService } from '@nx/isgcrm/shared';
import { SYSTEM_CONFIG } from '@nx/isgcrm/config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  doLogin(user: any){
    console.log( 'dologin dispatched');
    return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.LOGIN_PATH, user ).pipe(
      map((response: any) => {
        if( response ){
          localStorage.setItem('token', response.token);
          this.router.navigate(['./products']);
        }else{
          if( response.error ){
            return response.error;
          }
        }
      }),
      tap((request) => {

      }, (error) =>{
        return error;
      })
    ).toPromise();

  }
}
