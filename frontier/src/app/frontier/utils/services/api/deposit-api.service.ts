import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { GenerateTokenRequestInterface } from '../../../pages/billing/payment/interfaces/generate-token-request.interface';
import { setDepositCollectionResponse, setDepositRequirementsAction, setFundingAccountToken } from '../../store/actions';
import { DepositEndpoints } from '../endpoints/deposit';
import { DepositRequestInterface } from '../../../pages/billing/payment/interfaces/deposit-request.interface';
import { SnapshotStore } from '../state.service';
import { DepositResponse } from 'src/app/frontier/pages/billing/payment/interfaces/deposit-requirements-response.interface';
import { selectQuoteId } from '../../store/selectors';
import { getValueFromState } from '../../get-value-from-state';


@Injectable({
  providedIn: 'root'
})
export class DepositeApiService {
  depositEndpoints = new DepositEndpoints();

  constructor(private clientService: ClientService, private store: Store<any>, private snapShotStore: SnapshotStore) {
  }

  async getDepositRequirements(): Promise<DepositResponse> {
    const quoteId = this.snapShotStore.getQuoteId();
    const url = this.depositEndpoints.getDepositRequirementEndpoint();
    return await this.clientService.getAll(url, { quoteId }).
      pipe(
        tap((depositRequirements) => {
          this.store.dispatch(setDepositRequirementsAction({ depositRequirements }));
        })
      ).toPromise();
  }

  // tslint:disable-next-line:typedef
  async depositCollection(request: DepositRequestInterface) {
    const quoteId = this.snapShotStore.getQuoteId();
    const url = this.depositEndpoints.getDepositEndpoint(quoteId);
    return await this.clientService.post(url, request).pipe(
      tap((depositCollectionResponse) => {
        this.store.dispatch(setDepositCollectionResponse({ depositCollectionResponse }));
      })
    ).toPromise();
  }

  // tslint:disable-next-line:typedef
  async generatePaymentToken(accountUUID, request: GenerateTokenRequestInterface) {
    const url = this.depositEndpoints.getGeneratePaymentTokenEndpoint(accountUUID);
    return await this.clientService.post(url, request).
      pipe(
        map((response) => {
          return response.fundingAccountToken;
        }),
        tap((token) => {
          this.store.dispatch(setFundingAccountToken({ token }));
        })
      ).
      toPromise();
  }
}
