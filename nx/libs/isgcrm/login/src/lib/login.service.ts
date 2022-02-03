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
    return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.TOKEN_PATH, user ).pipe(
      map((response: any) => {
        if( response && response.token ){
          let currentUser = btoa(JSON.stringify( user ));
          localStorage.setItem('user', JSON.stringify( currentUser ));
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
        console.log('error at 37')
        return error;
      })
    ).toPromise();

  }
}
