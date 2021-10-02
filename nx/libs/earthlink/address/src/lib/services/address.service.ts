import { Injectable } from "@angular/core";
import { tap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ApiService } from "@nx/earthlink/shared";
import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { ENDPOINT } from '@nx/earthlink/api';
import { Router } from '@angular/router';
import { Address } from '../containers/address/interfaces/address';

import { addressRequest, errorAction } from "../+state/address/address.actions";

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    constructor( 
        private apiService: ApiService,
        private store: Store,
        private router: Router,
    ){};

    getAddress( uuid: any, headers: any ){
        console.log(headers);
        return this.apiService.post( SYSTEM_CONFIG.API_URL + ENDPOINT.address.get, uuid, headers ).pipe(
            map( (response: any ) => {
                console.log( response );
            }),
            tap( (response) => {
                console.log('tap response: ' + response )
            }, (error) => {
                this.store.dispatch( errorAction ({ error }))
            })
        ).toPromise();
    }

    serviceQualification( address: Address, headers: any ){
        
        return this.apiService.post(SYSTEM_CONFIG.API_URL + ENDPOINT.address.path, address, headers ).pipe(
            map( (response: any ) =>{
                let uuid = response.uuid;
                if( uuid ){
                    localStorage.setItem('uuid', uuid);
                    this.store.dispatch(addressRequest( { uuid } ))
//                  this.router.navigate([ENDPOINT.offers.navigate])
                }else{
                    throw new Error("We could not find offers");
                }
               return response;
            }),
            tap((response)=> {
                //console.log( response )
            },(error) => {
                this.store.dispatch( errorAction( { error }))
            }
            )
        ).toPromise();
    }
}