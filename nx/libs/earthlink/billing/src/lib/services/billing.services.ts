import { Injectable } from "@angular/core";
import { ApiService } from '@nx/earthlink/shared';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpHeaders } from "@angular/common/http";
import { payUrl } from "./endpoints";
import { paymentSuccess } from '../+state/billing/earthlink-billing.actions';
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
        debugger;
        return this.apiService.post( payUrl, payment, this.headers).pipe(
            map( (response: any ) => {
                //if( response ){
                    debugger;
                    this.store.dispatch(paymentSuccess( { payment } ));
                    this.router.navigate(['/confirmation']);
                //}
            }),
            tap( (response ) => {
                //clear the store and navigate to index
                console.log('TODO  clear the store');
            })
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