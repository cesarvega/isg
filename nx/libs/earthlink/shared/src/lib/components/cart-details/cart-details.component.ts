import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { Subscription } from "rxjs";
import { getProductState } from '@nx/earthlink/state'

@Component({
    selector: 'nx-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
    stateSubscription: Subscription | undefined;
    offers$: any = null;

    constructor(
        private store: Store,

    ){
        this.stateSubscription = this.store.select(getProductState).subscribe((offers) => {
            if( offers.order ){
                this.offers$ = {orderNumber: offers.order.order};
            }

        })
    }

}