import { Injectable } from '@angular/core';

import { SYSTEM_CONFIG } from '@nx/isgcrm/config';

import { ApiService } from '@nx/isgcrm/common';
import { CustomHeaders } from '@nx/earthlink/shared';

import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  token: any;
  headers: any = null;

  constructor(
    private apiService: ApiService,
    private customHeaders: CustomHeaders,
  ) { 
    this.token = localStorage.getItem('token'),
    this.headers = this.customHeaders.bearer( this.token );
  }

  getPartners(){
    return this.apiService.get( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PARTNERS_PATH, undefined).pipe(
      map( (response: any) => {
        if( response["hydra:member"]){
          return response["hydra:member"];
        }
        return false;
      }),
      tap((request: string) =>{
        console.log('tap:' + request);
      },(error: string) => {
        console.log( 'ISG: ' + error);
      }
      )
    ).toPromise()
  }
}
