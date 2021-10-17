import { Injectable } from "@angular/core";
import { ApiService } from '@nx/earthlink/shared';
//import { tap } from '@rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BillingService{

    constructor(
        private apiService: ApiService,
        private store: Store,
        private router: Router,
    ){ }

    validatePaymentMethod(){

    }

    createPayment(){

    }



}