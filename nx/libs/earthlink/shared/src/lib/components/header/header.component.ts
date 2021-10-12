import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAddressState, getBillingState, getAccountState, getProductState } from '@nx/earthlink/state';
@Component({
  selector: 'nx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  addressCheckStateSubscription: Subscription | undefined;
  addressCheckState = { osnResponse: null, error: null };

  offersCheckStateSubscription: Subscription | undefined;
  offersCheckState = { osnResponse: null, error: null };

  accountCheckStateSubscription: Subscription | undefined;
  accountCheckState = { osnResponse: null, error: null };


  billingCheckStateSubscription: Subscription | undefined;
  confirmationCheckStateSubscription: Subscription | undefined;
  constructor(
    private store: Store,

  ) { 
    this.addressCheckStateSubscription = this.store.select(getAddressState).subscribe((addressCheckState) =>{
      if( addressCheckState){
        this.addressCheckState.osnResponse = addressCheckState.request;
      }
    });

    this.offersCheckStateSubscription = this.store.select(getProductState).subscribe((productState) => {
      if( productState.request ){
        this.offersCheckState.osnResponse = productState.request;
      }
    })

    this.accountCheckStateSubscription = this.store.select(getAccountState).subscribe((accountState) =>{
      if( accountState.request ){
        this.accountCheckState.osnResponse = accountState.request;
      }
    })
  }

  ngOnInit(): void {
  }

}
