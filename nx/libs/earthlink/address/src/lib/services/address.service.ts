import { Injectable } from '@angular/core';
import { ApiService } from '@nx/earthlink/shared';
import { Address } from '../containers/address/interfaces/address';
import { qualify, transaction } from './endpoints';
import { tap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {  addressRequest, addressResponse, errorAction, loading, setCustomerType, setEarthLinkTransactionId, setTransaction } from '../+state/address/earthlink-address.actions';
import { productsActionRequest, productIdsActionRequest } from '@nx/earthlink/offers';
//import { mapResponse } from './helpers/mapResponse';
import { getTransactionId } from './helpers/getTransactionId';
//import { isServiceFound } from './helpers/serviceFound';
//import { noOffersFound } from './helpers/hasOffers';
import { Subscription } from 'rxjs';
import { getEarthlinkAddressState } from '../+state/address/earthlink-address.selectors';
import { orderDetailsActionRequest } from '@nx/earthlink/offers';
import { Offers } from '@nx/earthlink/offers';
import { OffersService } from '@nx/earthlink/offers';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

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
    

  ) {
    this.token = localStorage.getItem('token'),
    this.stateSubscription = this.store.select(getEarthlinkAddressState).subscribe((addresState) => {
      this.addressState = this.addressState
    });
    this.customHeaders();
   }

  
  serviceQualification(address: Address) {
    return this.apiService.post( qualify, address, this.headers).pipe(
      map((response: any) => {
        let uuid = response.uuid;
        if( uuid ){
            localStorage.setItem('uuidStr', uuid);
            //update address store
            this.store.dispatch(addressRequest( { address: address } ))
        }else{
            throw new Error("We could not find Offers");
        }
        //if (isServiceFound(response)) {
          this.store.dispatch(setCustomerType({ customerType: "SLI" }));
          return Offers;
        // }
        // else if (noOffersFound(response)) {
        //   throw new Error("We could not find Offers");
        // }
        // return response;
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
        this.store.dispatch(errorAction({ error }))
      }
      )
    ).toPromise();
  }

  generateTransaction() {
    this.store.dispatch(loading())
    return this.apiService.post(transaction, { "provider": "earthlink" }, this.headers).pipe(
      tap((response: any) => {
        const orderNumber = response.OrderNumber;
        this.store.dispatch(setTransaction({ transaction: orderNumber }))
      }, (error) => {
        this.store.dispatch(errorAction({ error }))
      }
      ),
    ).toPromise();
  }

  customHeaders(){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });
  }
}
