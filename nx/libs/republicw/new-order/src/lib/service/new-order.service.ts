import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ApiService, plans_body, byod_body, get_customer, dni_call } from '@nx/republicw/services';
import { SYSTEM_CONFIG } from '@nx/republicw/config';


@Injectable({
    providedIn: 'root'
})
export class NewOrderService {
    error$ = new Subject;
    constructor(
        private apiService: ApiService,
    ){ }

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

    getDniCall(agentId: string){
        var body = JSON.stringify( dni_call );
        body = body.replace(/@value@/, agentId);
        
        var d = new Date();//2021-08-13 
		var today = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); 
        body = body.replace(/@date@/, today);

        body = JSON.parse(body);

        return this.apiService.post(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.DNI_CALL, body, undefined ).pipe(
            map((response: any) => {
                return response.data;
            }),
            tap( (request: any) => {
                return request;
            }, (error) => {
                return error.message;
            })
        ).toPromise();
    }
}