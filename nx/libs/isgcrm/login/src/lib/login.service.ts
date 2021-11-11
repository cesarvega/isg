import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { ApiService } from '@nx/isgcrm/shared';
import { SYSTEM_CONFIG } from '@nx/isgcrm/config';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apiService: ApiService,

  ) { }

  doLogin(user: any){
    console.log( 'dologin dispatched');
    return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.LOGIN_PATH, user ).pipe(
      map((response: any) => {
        if( response ){
          //this.store.dispatch( currentUser)
          localStorage.setItem('currentUserId', response.id);
        }
      }),
      tap((request) => {

      }, (error) =>{
        console.log(error)
      })
    ).toPromise();

  }
}
