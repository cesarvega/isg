import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { DepositEndpoints } from '../endpoints/deposit';


@Injectable({
  providedIn: 'root'
})
export class DepositeApiService {
  depositEndpoints = new DepositEndpoints()

  constructor(private clientService: ClientService) {
  }

  async getDepositRequirements(quoteId: string) {
    let url = this.depositEndpoints.getDepositRequirementEndpoint();
    return await this.clientService.getAll(url, { quoteId }).toPromise();
  }

  async depositCollection(quoteId,request){
    let url = this.depositEndpoints.getDepositEndpoint(quoteId);
    return await this.clientService.post(url,request).toPromise()
  }

  async generatePaymentToken(accountUUID,request){
    let url = this.depositEndpoints.getGeneratePaymentTokenEndpoint(accountUUID);
    return await this.clientService.post(url,request).toPromise()
  }
}
