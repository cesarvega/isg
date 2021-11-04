import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { Subscription } from "rxjs";
import { getAddressState, getOffersState, getAccount } from '@nx/earthlink/state'
import { LOGOUT } from "@nx/earthlink/shared";


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

    stateAccountSubscription: Subscription | undefined;
    account$: any = null;

    constructor(
        private store: Store,

    ){
        /** Address/Phone Number **/
        this.addressCheckStateSubscription = this.store.select(getAddressState).subscribe((addressCheckState) =>{
            this.address$ = null;
            if( addressCheckState && addressCheckState.response ){
                this.address$ = addressCheckState.response;
            }
        });
        this.addressCheckStateSubscription.unsubscribe;

        /** Cart Order Number **/
        this.stateOfferSubscription = this.store.select(getOffersState).subscribe((offers) => {
            this.offers$ = null;
            if( offers && offers.orderNumber ){
                this.offers$ = {orderNumber: offers.orderNumber};
            }

        });
        this.stateOfferSubscription.unsubscribe;

        /** Product Information **/
        this.stateProductSubscription = this.store.select(getOffersState).subscribe((offer) => {
            this.product$ = null;
            this.monthly$ = null;
            if( offer && offer.product ){
                this.product$ = offer.product;
                if( offer.product.priceMonthly ){
                    this.monthly$ = offer.product.priceMonthly;

                    if( offer.product.equipmentPrice ){
                        this.monthly$ = offer.product.priceMonthly + offer.product.equipmentPrice;
                    }
                    
                    this.monthly$ = this.monthly$.toFixed(2);
                }
            }
        });
        this.stateProductSubscription.unsubscribe;
    
        /** Account Information **/
        this.stateAccountSubscription = this.store.select(getAccount).subscribe((account) => {
            this.account$ = null;
            if( account ){
                this.account$ = account;
            }
        })
    }

    restartOrder(){
        if( confirm('Are you sure to start/reset the application??') ){
            this.store.dispatch(LOGOUT());
        }
    }

}