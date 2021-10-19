import { Injectable } from "@angular/core";
import { ApiService } from '@nx/earthlink/shared';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpHeaders } from "@angular/common/http";
import { payUrl } from "./endpoints";
import { paymentSuccess, errorPayment } from '../+state/billing/earthlink-billing.actions';
import { confirmationSuccess } from '@nx/earthlink/confirmation';
import { iPayment } from '../interfaces/payment';
import { isParameter } from "typescript";


@Injectable({
    providedIn: 'root'
})
export class BillingService{

    headers: any = null;
    token: any = null;

    constructor(
        private apiService: ApiService,
        private store: Store,
        private router: Router,
    ){
        this.token = localStorage.getItem('token');
        this.customHeaders();
    }

    
    validatePaymentMethod(){

    }

    makeApayment( payment: iPayment){
        return this.apiService.post( payUrl, payment, this.headers).pipe(
            map( (response: any ) => {
                if( response && response.result && response.result == 'success' ){
                    this.store.dispatch(paymentSuccess( { payment } ));
                    this.store.dispatch(confirmationSuccess());
                    this.router.navigate(['/confirmation']);
                }
            }),
            tap( (response ) => {
                console.log('TODO  clear the store');
            },( error ) => {
                this.store.dispatch(errorPayment({ error }))
            }
            )
        ).toPromise();

    }


    customHeaders(){
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
    }
}