import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { AddressInterface } from 'src/app/isg-shared/interfaces/address';
import { environment } from 'src/environments/environment';
import { addressPredictiveSearchURL, createQuoteURL, generateTransactionIdURL } from '../endpoints';
import { AddressPredictiveSearchInterface } from '../interfaces/address-predictive-search';
import { AddressSearchResponseItemInterface } from '../interfaces/address-search-response';
import { CreateQuoteInterface } from '../interfaces/createQuote';
import { addressSearchRequestAction, addressSearchResponseAction, setCreateQuoteRequestAction, setCreateQuoteResponseAction, setSelectedAddressAction, setTransactionIdAction } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class Milestone1ApiService {

  constructor(private store: Store<any>, private clientService: ClientService) {

  }

  async generateQuote(address: AddressSearchResponseItemInterface, agentId) {
    this.store.dispatch(setSelectedAddressAction(address));
    let createQuoteRequest = this.createQuoteRequest(address, agentId);
    this.store.dispatch(setCreateQuoteRequestAction(createQuoteRequest));
    let quoteResponse = await this.clientService
      .post(createQuoteURL, createQuoteRequest)
      .toPromise();
    this.store.dispatch(setCreateQuoteResponseAction(quoteResponse));
    return quoteResponse;
  }

  async generateTransactionId() {
    let data = await this.clientService
      .getAll(generateTransactionIdURL)
      .toPromise();
    this.store.dispatch(setTransactionIdAction({ transactionId: data.transactionId }));
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

  createQuoteRequest(address: AddressSearchResponseItemInterface, agentId) {
    let createQuoteRequest: CreateQuoteInterface = {
      agent: String(agentId),
      customerType: environment.customerType,
      samControlNumber: address.samRecords[0].controlNumber,
      environmentCode: address.samRecords[0].environment,
      assisted: environment.assisted,
    };
    return createQuoteRequest;
  }
}
