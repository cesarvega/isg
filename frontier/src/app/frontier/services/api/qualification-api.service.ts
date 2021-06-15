import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { AddressInterface } from 'src/app/isg-shared/interfaces/address';
import { environment } from 'src/environments/environment';
import { addressExhaustiveSearchURL, addressPredictiveSearchURL } from '../endpoints/qualification';
import { AddressPredictiveSearchInterface } from '../interfaces/qualification/address-predictive-search';
import { addressSearchRequestAction, addressSearchResponseAction, setCreateQuoteRequestAction, setCreateQuoteResponseAction, setSelectedAddressAction, setTransactionIdAction } from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class QualificationApiService {

  constructor(private store: Store<any>, private clientService: ClientService) {

  }

  async addressExhaustiveSearch(address: AddressInterface) {
    this.store.dispatch(addressSearchRequestAction(address));
    let addressSearchResponse = await this.clientService
      .post(addressExhaustiveSearchURL, address)
      .toPromise();
    this.store.dispatch(addressSearchResponseAction(addressSearchResponse));
    return addressSearchResponse;
  }

  async addressPredictiveSearch(address: AddressInterface) {
    this.store.dispatch(addressSearchRequestAction(address));
    let addressPredictiveRequest = this.createAddressRequest(address);
    let addressSearchResponse = await this.clientService
      .post(addressPredictiveSearchURL, addressPredictiveRequest)
      .toPromise();
    this.store.dispatch(addressSearchResponseAction(addressSearchResponse));
    return addressSearchResponse;
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
