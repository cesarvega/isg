import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { GenerateTokenRequestInterface } from '../../billing/payment/interfaces/generate-token-request.interface';
import { setDepositRequirementsAction } from '../../store/actions';
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
          this.store.dispatch(setDepositRequirementsAction(depositRequirements))
        })
      ).toPromise();
  }

  async depositCollection(quoteId, request) {
    let url = this.depositEndpoints.getDepositEndpoint(quoteId);
    return await this.clientService.post(url, request).toPromise()
  }

  async generatePaymentToken(accountUUID, request: GenerateTokenRequestInterface) {
    let url = this.depositEndpoints.getGeneratePaymentTokenEndpoint(accountUUID);
    return await this.clientService.post(url, request).toPromise()
  }
}
