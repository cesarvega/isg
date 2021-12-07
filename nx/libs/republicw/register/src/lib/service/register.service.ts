import { Injectable } from "@angular/core";
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from '@nx/republicw/services';
import { SYSTEM_CONFIG } from '@nx/republicw/config';
import { of, throwError } from "rxjs";
import { rep_wireless, get_sales_customer } from "@nx/republicw/services";
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewRegister {
    data: any = {};
    formData!: any;
    err: any = null;
    result$ = new Subject;
    error$ = new Subject;
    constructor(
        private apiService: ApiService,
        private router: Router,
    ){ }

    getDishUrl( body: any ){
        return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.DISH_PATH, body, undefined ).pipe(
            map((data: any) => { 
                return data;
            }),
            tap( (request) => {
                return request;
            }, (error) => {
                return error;
            })
        ).toPromise();
    }

    register( body: any ){
        localStorage.setItem('phone_number', '');

        this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.REGISTER_PATH, body, undefined ).pipe(
            catchError( err => {
                //if(err.error.message.match(/duplicate/g)) return of( undefined )
                
                this.error$.next( {error: err.error.message });
                return throwError(err);
            })
        ).subscribe( 
            (data: any) => {
                    body = JSON.stringify(rep_wireless);
                    body = body.replace(/@firstName/, data[0].first_name);
                    body = body.replace(/@lastName/, data[0].last_name);
                    body = body.replace(/@lineOne/, data[0].address_one);
                    body = body.replace(/@lineTwo/, data[0].address_two);
                    body = body.replace(/@city/, data[0].city);
                    body = body.replace(/@state/, data[0].state);
                    body = body.replace(/@zip/, data[0].zip_code);
                    body = body.replace(/@lineOne/, data[0].address_one);
                    body = body.replace(/@emailAddress/, data[0].email);
                    body = body.replace(/@phone/, data[0].phone_number);
                    body = JSON.parse( body );
                    
                localStorage.setItem('phone_number', data[0].phone_number);
                
                this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.DISH_PATH, body, undefined ).pipe(
                    catchError( err => this.err = of( undefined))
                ).subscribe(
                    (data: any ) => {
                        if( data.Url ){
                            window.open( data.Url, "_blank" );
                            this.router.navigate(['/new-order']);
                        }else{

                            this.error$.next( data );
                            this.error$.asObservable();
                        }
                    }
                )
            },
            //err => console.log( 'HTTP Error', err),
            //() => console.log('HTTP request completed')
        );
        return this.error$.asObservable();
    }

    requestToken(): any{
        this.formData = new FormData();
        this.formData = new FormGroup({
            email: new FormControl(SYSTEM_CONFIG.EMAIL),
            password: new FormControl(SYSTEM_CONFIG.PASSWORD)
        });

        const body = this.formData.value;
        return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.TOKEN_PATH, body, undefined ).pipe(
                catchError( err => {
                    this.error$.next( { error: err.error.message } );
                    return this.error$.asObservable();
                }),
                map( (response: any ) => {
                    return response.token;
                }),
                tap( ( token: any ) => {
                    localStorage.setItem('token', token );
                    return token;
                },(error) => {
                    return error;
                })
            ).toPromise(); 
        //}
        // this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.TOKEN_PATH, body, undefined).pipe(
        //     catchError( err => this.err = of( "Authentication error" ))
        // ).subscribe(
        //     (data: any) => {
        //         localStorage.removeItem('token');
        //         localStorage.setItem('token', data.token );
        //         return data.token;
        //     }
        // )

    }

    getCustomer( phone_number: string){
        var body = JSON.stringify( get_sales_customer);
        body = body.replace(/@@/, phone_number);
        body = JSON.parse( body );
        return this.apiService.post(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.SALES_CUSTOMER, body, undefined).pipe(
            catchError( err => {
                this.error$.next( { error: err.error.message } );
                return this.error$.asObservable();
            }),
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
}