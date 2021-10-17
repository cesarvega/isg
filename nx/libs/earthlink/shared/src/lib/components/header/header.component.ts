import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAddressState, getBillingState, getAccountState, getProductState, getConfirmationState } from '@nx/earthlink/state';
@Component({
  selector: 'nx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed: any = false;
  addressCheckStateSubscription: Subscription | undefined;
  addressCheckState = { osnResponse: null, error: null };

  offersCheckStateSubscription: Subscription | undefined;
  offersCheckState = { osnResponse: null, error: null };

  accountCheckStateSubscription: Subscription | undefined;
  accountCheckState = { osnResponse: null, error: null };


  billingCheckStateSubscription: Subscription | undefined;
  billingCheckState = { osnResponse: null, error: null };

  confirmationCheckStateSubscription: Subscription | undefined;
  confirmationCheckState = { osnResponse: null, error: null };

  constructor(
    private store: Store,

  ) { 
    this.addressCheckStateSubscription = this.store.select(getAddressState).subscribe((addressCheckState) =>{
      if( addressCheckState.response ){
        this.addressCheckState.osnResponse = addressCheckState.response;
      }
    });

    this.offersCheckStateSubscription = this.store.select(getProductState).subscribe((productState) => {
      if( productState.response ){
        this.offersCheckState.osnResponse = productState.response;
      }
    })

    /**** Checking if a product exists in offers.product ****/
    this.accountCheckStateSubscription = this.store.select(getProductState).subscribe((productState) =>{
      if( productState.product ){
        this.accountCheckState.osnResponse = productState.product;
      }
    })

    /** Checking if the Store has value at earthlinkAccount.response  node **/
    this.billingCheckStateSubscription = this.store.select(getAccountState).subscribe((accountState) =>{
      if( accountState && accountState.response ){
        this.billingCheckState.osnResponse = accountState.response;
      }
    })

    this.confirmationCheckStateSubscription = this.store.select(getConfirmationState).subscribe((confirmationState) => {
      if( confirmationState.request ){
        this.confirmationCheckState.osnResponse = confirmationState.response;
      }
    })
  }

  ngOnInit(): void {
  }

}
