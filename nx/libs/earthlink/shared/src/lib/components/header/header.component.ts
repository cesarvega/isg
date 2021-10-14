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

    this.accountCheckStateSubscription = this.store.select(getAccountState).subscribe((accountState) =>{
      if( accountState.request ){
        this.accountCheckState.osnResponse = accountState.request;
      }
    })

    this.billingCheckStateSubscription = this.store.select(getBillingState).subscribe((billingState) =>{
      if( billingState.request ){
        this.billingCheckState.osnResponse = billingState.request;
      }
    })

    this.confirmationCheckStateSubscription = this.store.select(getConfirmationState).subscribe((confirmationState) => {
      if( confirmationState.request ){
        this.confirmationCheckState.osnResponse = confirmationState.request;
      }
    })
  }

  ngOnInit(): void {
  }

}
