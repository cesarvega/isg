import { Injectable } from "@angular/core";
import { ApiService } from '@nx/earthlink/shared';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpHeaders } from "@angular/common/http";
import { SYSTEM_CONFIG } from "@nx/earthlink/config";
import { paymentSuccess, errorPayment } from '../+state/billing/earthlink-billing.actions';
import { confirmationSuccess } from '@nx/earthlink/confirmation';
import { iPayment } from '../interfaces/payment';
import { CustomHeaders } from "@nx/earthlink/shared";


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
        private customHeaders: CustomHeaders,
    ){
        this.token = localStorage.getItem('token');
        this.headers = this.customHeaders.bearer( this.token );
    }

    
    validatePaymentMethod(){

    }

    makeApayment( payment: iPayment){
        return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.payment, payment, this.headers).pipe(
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
}