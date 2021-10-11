import { Injectable } from '@angular/core';
import { ApiService } from '@nx/earthlink/shared';
import { tap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Offers } from './products';
import { productsActionRequest, productIdsActionRequest } from '../../lib/+state/offers/earthlink-offers.actions';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  stateSubscription: Subscription = new Subscription;

  constructor(
    private apiService: ApiService,
    private store: Store<any>,
  ) { 

  }

  productsActionRequestService(request: any){
    this.store.dispatch(productsActionRequest({ request: request }))
    
  }

  productIdsActionRequestService( request: any ){
    this.store.dispatch(productIdsActionRequest( { ids: request }))
  }
  
}