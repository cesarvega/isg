import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { getAddressState, getBillingState, getAccountState, getProductState, getConfirmationState } from '@nx/earthlink/state';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { LOGOUT } from '@nx/earthlink/shared';
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

  stateSubscription: Subscription | undefined;
  constructor(
    private store: Store,
    private router: Router,
    private update$: Actions,
  ) { 

    this.stateSubscription = update$.pipe(
      ofType(LOGOUT))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) =>{
        if( data && data.type && data.type == 'Logout' ){
          this.router.navigate(['/address']);
        }
      })
    this.stateSubscription.unsubscribe;


    this.addressCheckStateSubscription = this.store.select(getAddressState).subscribe((addressCheckState) =>{
      this.addressCheckState.osnResponse = null;
      if( addressCheckState.response ){
        this.addressCheckState.osnResponse = addressCheckState.response;
      }
    });

    this.offersCheckStateSubscription = this.store.select(getProductState).subscribe((productState) => {
      this.offersCheckState.osnResponse = null;
      if( productState.response ){
        this.offersCheckState.osnResponse = productState.response;
      }
    })

    /**** Checking if a product exists in offers.product ****/
    this.accountCheckStateSubscription = this.store.select(getProductState).subscribe((productState) =>{
      this.accountCheckState.osnResponse = null;
      if( productState.product ){
        this.accountCheckState.osnResponse = productState.product;
      }
    })

    /** Checking if the Store has value at earthlinkAccount.response  node **/
    this.billingCheckStateSubscription = this.store.select(getAccountState).subscribe((accountState) =>{
      this.billingCheckState.osnResponse = null;
      if( accountState && accountState.response ){
        this.billingCheckState.osnResponse = accountState.response;
      }
    })

    this.confirmationCheckStateSubscription = this.store.select(getConfirmationState).subscribe((confirmationState) => {
      this.confirmationCheckState.osnResponse = null;
      if( confirmationState && confirmationState.response ){
        this.confirmationCheckState.osnResponse = confirmationState.response;
      }
    })
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }

}
