import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { environment } from 'src/environments/environment';
import { createQuoteURL, generateTransactionIdURL, getCompleteTaskURL, validateQuoteURL, getValidateQuoteURL, getQuoteURL, getSubmitQuoteURL } from '../endpoints/qualification';
import { AddressSearchResponseItemInterface } from '../interfaces/qualification/address-search-response';
import { CreateQuoteInterface } from '../interfaces/qualification/create-quote';
import { setCreateQuoteRequestAction, setCreateQuoteResponseAction, setCustomerAction, setSelectedAddressAction, setSubmitOrderResponse, setTransactionIdAction, validateQuoteAction } from '../../store/actions';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { selectQuoteId } from '../../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class QuoteApiService {
  quoteIdSubscription$: Subscription;
  quoteId: string;

  constructor(private store: Store<any>, private clientService: ClientService) {
    this.store.select(selectQuoteId).subscribe((quoteId) => {
      this.quoteId = quoteId;
    })
  }

  ngOnDestroy(): void {
    this.quoteIdSubscription$.unsubscribe();
  }

  async generateQuote(address: AddressSearchResponseItemInterface, agentId) {
    this.store.dispatch(setSelectedAddressAction(address));
    let createQuoteRequest = this.createQuoteRequest(address, agentId);
    this.store.dispatch(setCreateQuoteRequestAction(createQuoteRequest));
    return this.clientService
      .post(createQuoteURL, createQuoteRequest).pipe(
        tap((quoteResponse) => {
          this.store.dispatch(setCreateQuoteResponseAction(quoteResponse));
          if (quoteResponse.customer) {
            this.store.dispatch(setCustomerAction({ customer: quoteResponse.customer }));
          }
        })
      )
      .toPromise();
  }

  async validateQuote(quoteId) {
    return await this.clientService
      .post(getValidateQuoteURL(quoteId), null).pipe(
        tap(() => {
          this.store.dispatch(validateQuoteAction());
        })
      )
      .toPromise();
  }

  submitQuote() {
    return this.clientService
      .post(getSubmitQuoteURL(this.quoteId), null).pipe(
        tap((response) => {
          this.store.dispatch(setSubmitOrderResponse({ order: response }))
        })
      )
      .toPromise();
  }

  async getQuote(quoteId, includeConfiguration, includeNotes) {
    let quoteURL = getQuoteURL;
    quoteURL = quoteURL.replace("{quoteId}", quoteId)
    let params = { includeConfiguration, includeNotes }
    return await this.clientService
      .getAll(quoteURL, params)
      .toPromise();
  }

  async completeTask(taskId, quoteId) {
    return await this.clientService
      .get(getCompleteTaskURL(taskId, quoteId), quoteId)
      .toPromise();
  }

  async generateTransactionId() {
    let data = await this.clientService
      .getAll(generateTransactionIdURL)
      .toPromise();
    this.store.dispatch(setTransactionIdAction({ transactionId: data.transactionId }));
  }

  createQuoteRequest(address: AddressSearchResponseItemInterface, agentId) {
    let createQuoteRequest: CreateQuoteInterface = {
      agent: agentId.toString(),
      customerType: environment.customerType,
      samControlNumber: address.samRecords[0].controlNumber,
      environmentCode: address.samRecords[0].environment,
      assisted: environment.assisted,
    };
    return createQuoteRequest;
  }
}
