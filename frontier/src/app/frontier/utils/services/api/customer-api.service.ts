import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { CustomerInterface } from '../interfaces/customer/customer';
import { getCustomerURL, creditCheckURL, getNumberPortabiltyURL } from '../endpoints/customer';
import { Store } from '@ngrx/store';
import { setCustomerAction, setCustomerForms, setCreditCheckResult } from '../../store/actions';
import { AccountFormInterface, IdentityFormInterface } from '../interfaces/customer/credit-check-form';
import { selectCustomer, selectQuoteId } from '../../store/selectors';
import { Subscription } from 'rxjs';
import { CustomerContactBuilder } from '../builders/customer/customer-contact-builder';
import { getValueFromState } from '../../get-value-from-state';
import { AddressInterface } from '../interfaces/customer/customer';
import { map, tap } from 'rxjs/operators';
import { mapCreditCheckInformation } from 'src/app/frontier/pages/credit-check/helpers/mapCreditCheckInformation';
import { NumberPortabilityRequestInterface } from '../interfaces/customer/number-portability-request';
import { NumberPortabilityResponse } from '../interfaces/customer/number-portability-response';


@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  quoteId: string
  quoteSubscription: Subscription

  constructor(private clientService: ClientService, private store: Store<any>, private customerContactBuilder: CustomerContactBuilder) {
    store.select(selectQuoteId).subscribe((quoteId) => {
      this.quoteId = quoteId;
    })
  }

  ngOnDestroy(): void {
    this.quoteSubscription.unsubscribe();
  }

  updateCustomer(identityForm: IdentityFormInterface, accountForm: AccountFormInterface, address: AddressInterface) {
    let previousCustomer = getValueFromState(this.store.select(selectCustomer));
    let customer = this.customerContactBuilder.buildAccountAndVerifyInformation(accountForm, identityForm, previousCustomer, address);
    let endpoint = getCustomerURL + "/" + customer.accountUuid;
    return this.clientService.patch(endpoint, this.quoteId, customer).pipe(
      tap(() => {
        this.store.dispatch(setCustomerForms({ accountForm, identityForm }))
        this.store.dispatch(setCustomerAction({ customer }))
      })
    ).toPromise();
  }

  creditCheck(request = null) {
    let customer: CustomerInterface = getValueFromState(this.store.select(selectCustomer))
    let endpoint = creditCheckURL;
    endpoint = endpoint.replace("{accountUuid}", customer.accountUuid);
    endpoint = endpoint.replace("{quoteId}", this.quoteId);
    return this.clientService.post(endpoint, request).pipe(
      map((response) => {
        response.creditScore.description = mapCreditCheckInformation(response.creditScore.rating);
        return response;
      }),
      tap((creditCheckResult) => {
        this.store.dispatch(setCreditCheckResult({ creditCheckResult }))
      })).toPromise();
  }

  numberPortability(phoneNumber): Promise<NumberPortabilityResponse> {
    const endpoint = getNumberPortabiltyURL(this.quoteId);
    const request: NumberPortabilityRequestInterface = {
      phoneNumbers: [
        {
          phoneNumber
        }
      ]
    }
    return this.clientService.put(endpoint, request).toPromise()
  }

}
