import { Injectable } from '@angular/core';
import { StateService } from 'src/app/frontier/utils/services/state.service';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { BillingEndpoints } from './endpoints/billing-endpoints';

@Injectable({
  providedIn: 'root'
})
export class BillingApiService {
  billingEndpoints = new BillingEndpoints();

  constructor(private stateService: StateService, private clientService: ClientService) { }

  getBillPreview() {
    let quoteId = this.stateService.getQuoteId();
    let params = { quoteId };
    let endpoint = this.billingEndpoints.getBillPreviewEndpoint();
    return this.clientService.getAll(endpoint, params).toPromise();
  }
}
