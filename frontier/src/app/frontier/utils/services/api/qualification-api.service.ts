import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { AddressInterface } from 'src/app/isg-shared/interfaces/address';
import { environment } from 'src/environments/environment';
import { addressExhaustiveSearchURL, addressPredictiveSearchURL } from '../endpoints/qualification';
import { AddressPredictiveSearchInterface } from '../interfaces/qualification/address-predictive-search';
import { addressSearchRequestAction, addressSearchResponseAction, setCorrelationId, setCreateQuoteRequestAction, setCreateQuoteResponseAction, setSelectedAddressAction, setTransactionIdAction } from '../../store/actions';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QualificationApiService {

  constructor(private store: Store<any>, private clientService: ClientService) {

  }

  async addressExhaustiveSearch(address: AddressInterface): Promise<AddressInterface[]> {
    this.store.dispatch(addressSearchRequestAction(address));
    return this.clientService
      .post(addressExhaustiveSearchURL, address)
      .pipe(
        tap((addressSearchResponse) => {
          let CorrelationId = addressSearchResponse.CorrelationId;
          this.store.dispatch(setCorrelationId({ CorrelationId }));
        }),
        map((addressSearchResponse) => {
          let addresses = addressSearchResponse.addresses
          if (addresses.length < 1) {
            throw new Error("No address found");
          } else {
            return addresses;
          }
        },
        )).toPromise();
  }

   addressPredictiveSearch(address: AddressInterface) {
    this.store.dispatch(addressSearchRequestAction(address));
    let addressPredictiveRequest = this.createAddressRequest(address);
    return  this.clientService
      .post(addressPredictiveSearchURL, addressPredictiveRequest)
      .pipe(map((response)=>{
        return response.addresses;
      }),tap((response)=>{
        this.store.dispatch(addressSearchResponseAction(response));
      }))
      .toPromise();
  }
  private createAddressRequest(
    address: AddressInterface
  ): AddressPredictiveSearchInterface {
    let { addressLine1, addressLine2, city, stateProvince, zipCode } = address;
    let unparsedAddress = `${addressLine1} ${addressLine2}
    ${city} ${stateProvince} ${zipCode}`;
    let requestInterface: AddressPredictiveSearchInterface = {
      address: unparsedAddress,
      stateProvince: address.stateProvince,
    };
    return requestInterface;
  }

}
