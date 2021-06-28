import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { GenerateTokenRequestInterface } from '../../billing/payment/interfaces/generate-token-request.interface';
import { setDepositRequirementsAction, setFundingAccountToken } from '../../store/actions';
import { DepositEndpoints } from '../endpoints/deposit';


@Injectable({
  providedIn: 'root'
})
export class DepositeApiService {
  depositEndpoints = new DepositEndpoints()

  constructor(private clientService: ClientService, private store: Store<any>) {
  }

  async getDepositRequirements(quoteId: string) {
    let url = this.depositEndpoints.getDepositRequirementEndpoint();
    return await this.clientService.getAll(url, { quoteId }).
      pipe(
        tap((depositRequirements) => {
          this.store.dispatch(setDepositRequirementsAction({ depositRequirements }))
        })
      ).toPromise();
  }

  async depositCollection(quoteId, request) {
    let url = this.depositEndpoints.getDepositEndpoint(quoteId);
    return await this.clientService.post(url, request).toPromise()
  }

  async generatePaymentToken(accountUUID, request: GenerateTokenRequestInterface) {
    let url = this.depositEndpoints.getGeneratePaymentTokenEndpoint(accountUUID);
    return await this.clientService.post(url, request).
      pipe(
        map((response) => {
          return response.fundingAccountToken;
        }),
        tap((token) => {
          this.store.dispatch(setFundingAccountToken({ token }))
        })
      ).
      toPromise()
  }
}
