import { Injectable } from '@angular/core';
import { ApiService } from '@nx/earthlink/shared';
import { Address } from '../containers/address/interfaces/address';
import { qualify, transaction } from './endpoints';
import { tap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {  addressRequest, addressResponse, errorAction, loading, setCustomerType, setEarthLinkTransactionId, setTransaction } from '../+state/address/earthlink-address.actions';
import { mapResponse } from './helpers/mapResponse';
import { getTransactionId } from './helpers/getTransactionId';
import { isServiceFound } from './helpers/serviceFound';
import { noOffersFound } from './helpers/hasOffers';
import { Subscription } from 'rxjs';
import { getEarthlinkAddressState } from '../+state/address/earthlink-address.selectors';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressState = {
    error: null,
    loading: false,
    customerType: "NEW"
  };

  stateSubscription: Subscription = new Subscription;
  constructor(
    private apiService: ApiService,
    private store: Store<any>,
  
  ) {
    this.stateSubscription = this.store.select(getEarthlinkAddressState).subscribe((addresState) => {
      this.addressState = this.addressState
    })
   }

  serviceQualification(address: Address, headers: any) {
    this.store.dispatch(addressRequest({ address }))
    return this.apiService.post( qualify, address, headers).pipe(
      map((response: any) => {
        let uuid = response.uuid;
        if( uuid ){
            localStorage.setItem('uuidStr', uuid);
            //update address store
            this.store.dispatch(addressRequest( { address } ))
            //this.router.navigate([ENDPOINT.offers.navigate])
        }else{
            throw new Error("We could not find offers");
        }
        //if (isServiceFound(response)) {
          this.store.dispatch(setCustomerType({ customerType: "SLI" }));
          return response;
        // }
        // else if (noOffersFound(response)) {
        //   throw new Error("We could not find offers");
        // }
        // return response;
      }),
      tap((response) => {
        console.log(response);
        const products = mapResponse(response);
        const earthLinkTransactionId = getTransactionId(response);
        this.store.dispatch(addressResponse({ response: response }))
        this.store.dispatch(setEarthLinkTransactionId({ earthLinkTransactionId }))
      }, (error) => {
        this.store.dispatch(errorAction({ error }))
      }
      )
    ).toPromise();
  }

  generateTransaction(headers:any) {
    this.store.dispatch(loading())
    return this.apiService.post(transaction, { "provider": "earthlink" }, headers).pipe(
      tap((response: any) => {
        const orderNumber = response.OrderNumber;
        this.store.dispatch(setTransaction({ transaction: orderNumber }))
      }, (error) => {
        this.store.dispatch(errorAction({ error }))
      }
      ),
    ).toPromise();
  }

}
