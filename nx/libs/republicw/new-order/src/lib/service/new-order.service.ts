import { Injectable } from '@angular/core';
import { throwError, AsyncSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ApiService, plans_body, byod_body, get_customer } from '@nx/republicw/services';
import { SYSTEM_CONFIG } from '@nx/republicw/config';
//import { CustomHeaders } from '@nx/earthlink/shared';

@Injectable({
    providedIn: 'root'
})
export class NewOrderService {
    constructor(
        private apiService: ApiService,
        //private customHeaders: CustomHeaders,
    ){ }

    // response$ = new AsyncSubject();
    // response$.subscribe( result => console.log('Server response:', result)
    //     //err => console.log(err),
    //     //() => console.log( 'Completed')
    // );


    getLinesQuantity(){
        //const header = this.customHeaders.bearer(localStorage.getItem('token'));
        return this.apiService.get(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.SERVICE_LINES_PATH, undefined, undefined).pipe(
            map((response: any ) => {
                if( response.data ){
                    return response.data;
                }else{
                    return throwError ('No lines returned');
                }
            })
        ).toPromise();
    }

    getByod(): any{
        const body = byod_body;
        //const header = this.customHeaders.bearer(localStorage.getItem('token'));
        return this.apiService.post(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PRODUCTS_PATH, body, undefined).pipe(
            map((response: any) => {
                return response.data;
            }),
            tap((request) => {
                return request.data;
            },(error) => {
                return error.message;
            })
        ).toPromise();
    }

    getPlans( q: string ): any{
        var body = JSON.stringify( plans_body );
        body = body.replace(/@@/, q);
        body = JSON.parse( body );
        //const header = this.customHeaders.bearer(localStorage.getItem('token'));
        localStorage.setItem('plans', '');

        return this.apiService.post(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PRODUCTS_PATH, body, undefined).pipe(
            map( (response: any ) => {
                localStorage.setItem('plans', JSON.stringify( response.data ));
                return response.data;
            }),
            tap((request) => {
                return request.data;
            }, (error) => {
                return error;
            })
        ).toPromise();
    }

    getCustomer(phone: string){
        var body = JSON.stringify( get_customer );
        body = body.replace(/@@/, phone);
        body = JSON.parse(body);
        // this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.GET_CUSTOMER, body, undefined )
        //         .subscribe(
        //             result => { 
        //                 //this.response$.next( result );
        //                 //this.response$.complete();
        //             }
        //         );
        // //return this.response$;
        // //const header = this.customHeaders.bearer(localStorage.getItem('token'));
        return this.apiService.post(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.GET_CUSTOMER, body, undefined).pipe(
            map( (response: any) => {
                return response.data[0];
            }),
            tap( (request: any) => {
                return request;
            }, (error) => {
                return error;
            })
        ).toPromise();
    }

    putNewOrder( body: any ){
        //const header = this.customHeaders.bearer(localStorage.getItem('token'));

        return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.PUT_ORDER, body, undefined ).pipe(
            map((response: any) => {
                return response.data;
            }),
            tap((request: any) => {
                console.log('CallKey: ' + request[0].call_key );
            }, (error) =>{
                console.log('returned error:' + error ); 
            })
        ).toPromise();
    }
}