import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { Subscription } from "rxjs";
import { getAddressState, getOffersState } from '@nx/earthlink/state'
import { getProducts } from "@nx/earthlink/offers";

@Component({
    selector: 'nx-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
    addressCheckStateSubscription: Subscription | undefined;
    address$: any = null;

    stateOfferSubscription: Subscription | undefined;
    offers$: any = null;

    stateProductSubscription: Subscription | undefined;
    product$: any = null;
    monthly$: any = null;

    account$: any = null;

    constructor(
        private store: Store,

    ){
        this.addressCheckStateSubscription = this.store.select(getAddressState).subscribe((addressCheckState) =>{
            if( addressCheckState.response ){
                this.address$ = addressCheckState.response;
            }
        });
        this.addressCheckStateSubscription.unsubscribe;

        this.stateOfferSubscription = this.store.select(getOffersState).subscribe((offers) => {
            if( offers.orderNumber ){
                this.offers$ = {orderNumber: offers.orderNumber};
            }

        });
        this.stateOfferSubscription.unsubscribe;

        this.stateProductSubscription = this.store.select(getOffersState).subscribe((offer) => {
            if( offer.product ){
                this.product$ = offer.product;
                this.monthly$ = offer.product.priceMonthly + offer.product.equipmentPrice;
                this.monthly$ = this.monthly$.toFixed(2);
            }
        });

    
    }

    restartOrder(){
        alert("Are you sure?");
    }

}