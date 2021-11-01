import { Injectable } from '@angular/core';
import { ApiService } from '@nx/earthlink/shared';
import { Address } from '../containers/address/interfaces/address';
import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { tap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {  addressRequest, errorAction, loading, setCustomerType, setEarthLinkTransactionId, setTransaction } from '../+state/address/earthlink-address.actions';
import { productsActionRequest } from '@nx/earthlink/offers';

import { getTransactionId } from './helpers/getTransactionId';

import { Subscription } from 'rxjs';
import { getEarthlinkAddressState } from '../+state/address/earthlink-address.selectors';
import { orderDetailsActionRequest } from '@nx/earthlink/offers';

import { OffersService } from '@nx/earthlink/offers';
import { Router } from '@angular/router';
import { CustomHeaders } from '@nx/earthlink/shared';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressState = {
    error: null,
    loading: false,
    customerType: "NEW"
  };
  token: any;
  headers: any = null;

  stateSubscription: Subscription = new Subscription;

  constructor(
    private apiService: ApiService,
    private store: Store<any>,
    private router: Router,
    private offersService: OffersService,
    private customHeaders: CustomHeaders,

  ) {
      this.token = localStorage.getItem('token'),
      this.stateSubscription = this.store.select(getEarthlinkAddressState).subscribe((addresState) => {
        this.addressState = this.addressState
      });
      this.headers = this.customHeaders.bearer( this.token );
    }

  
  serviceQualification(address: Address) {
    return this.apiService.post( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.qualify, address, this.headers).pipe(
      map((response: any) => {
        if( response && response.result && response.result.availableProductCount ){
            //update address store
            this.store.dispatch(addressRequest( { address: address } ))
        }else{
          return response.error;
            throw new Error("We could not find Offers");
        }
        //if (isServiceFound(response)) {
          this.store.dispatch(setCustomerType({ customerType: "SLI" }));

          /*** Returning OFFERS ***/
          return response.result;
        // }
      }),
      tap((request) => {
        const order = request.orderNumber;
        const availableProducts = request.availableProducts;
        const availableProductsIds = request.availableProductIds;
        const earthLinkTransactionId = getTransactionId(request);
        
        //update the offers store
        //this.offersService.orderDetailActionRequestService({ order: order });
        this.store.dispatch(orderDetailsActionRequest( { order } ));

        //this.offersService.productsActionRequestService({ availableProducts });
        this.store.dispatch(productsActionRequest({ products: availableProducts }))

        this.offersService.productIdsActionRequestService({ availableProductsIds })
        this.store.dispatch(setEarthLinkTransactionId({ earthLinkTransactionId }))
      }, (error) => {
        this.store.dispatch(errorAction({ error: error }))
      }
      )
    ).toPromise();
  }

  generateTransaction() {
    this.store.dispatch(loading())
    return this.apiService.post(SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.transaction, { "provider": "earthlink" }, this.headers).pipe(
      tap((response: any) => {
        const orderNumber = response.OrderNumber;
        this.store.dispatch(setTransaction({ transaction: orderNumber }))
      }, (error) => {
        this.store.dispatch(errorAction({ error: error.error }))
      }
      ),
    ).toPromise();
  }

}
