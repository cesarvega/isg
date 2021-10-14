import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { Subscription } from "rxjs";
import { getAddressState, getProductState } from '@nx/earthlink/state'

@Component({
    selector: 'nx-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
    addressCheckStateSubscription: Subscription | undefined;
    address$: any = null;

    stateSubscription: Subscription | undefined;
    offers$: any = null;

    constructor(
        private store: Store,

    ){
        this.stateSubscription = this.store.select(getProductState).subscribe((offers) => {
            if( offers.orderNumber ){
                this.offers$ = {orderNumber: offers.orderNumber};
            }

        });

        this.addressCheckStateSubscription = this.store.select(getAddressState).subscribe((addressCheckState) =>{
            if( addressCheckState.response ){
                this.address$ = addressCheckState.response;
            }
        });        
    }

}