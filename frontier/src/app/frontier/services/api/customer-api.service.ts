import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { CustomerInterface } from '../interfaces/customer/customer';
import { getCustomerURL, creditCheckURL } from '../endpoints/customer';
import { Store } from '@ngrx/store';
import { setCustomerAction } from '../../store/actions';


@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private clientService: ClientService, private store: Store<any>) {

  }

  async updateCustomer(customer: CustomerInterface, quoteId: string) {
    this.store.dispatch(setCustomerAction({ customer }))
    let endpoint = getCustomerURL + "/" + customer.accountUuid;
    return await this.clientService.patch(endpoint, quoteId, customer).toPromise();
  }

  async creditCheck(accountUuid: string, quoteId: string) {
    let endpoint = creditCheckURL;
    endpoint = endpoint.replace("{accountUuid}", accountUuid);
    endpoint = endpoint.replace("{quoteId}", quoteId);
    return await this.clientService.post(endpoint, null).toPromise();
  }

}
