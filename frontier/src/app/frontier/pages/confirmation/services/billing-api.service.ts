import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SnapshotStore } from 'src/app/frontier/utils/services/state.service';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { BillingEndpoints } from './endpoints/billing-endpoints';

@Injectable({
  providedIn: 'root'
})
export class BillingApiService {
  billingEndpoints = new BillingEndpoints();

  constructor(private snapShotStore: SnapshotStore, private clientService: ClientService) { }

  getBillPreview() {
    let quoteId = this.snapShotStore.getQuoteId();
    let params = { quoteId };
    let endpoint = this.billingEndpoints.getBillPreviewEndpoint();
    return this.clientService.getAll(endpoint, params).pipe(map((billingPreviewResponse) => {
      let billPreviewHTML = billingPreviewResponse.billPreviewHTML;
      let openSymbol = /&lt;/g;
      let closeSymbol = /&gt;/g;
      billPreviewHTML = billPreviewHTML.replace(openSymbol, "<")
      billPreviewHTML = billPreviewHTML.replace(closeSymbol, ">")
      return billPreviewHTML;

    })).toPromise();
  }
}
