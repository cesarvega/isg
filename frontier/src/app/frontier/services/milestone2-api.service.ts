import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { getOffersURL } from '../endpoints';


@Injectable({
  providedIn: 'root'
})
export class Milestone2ApiService {

  constructor(private store: Store<any>, private clientService: ClientService) {

  }


  async getOffers(quoteId) {
    let endpoint = getOffersURL + "/" + quoteId;
    return await this.clientService.getAll(endpoint).toPromise();
  }
}
