import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { CustomerInterface } from '../interfaces/customer/customer';
import { Store } from '@ngrx/store';
import { DisclosureEndpoints } from '../endpoints/disclosures';
import { acceptDisclosuresAction, setDisclosuresAction } from '../../store/actions';
import { DisclosureInterface } from '../interfaces/disclosures/disclosure-interface';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DisclosuresApiService {
  disclosureEndpoints: DisclosureEndpoints

  constructor(private clientService: ClientService, private store: Store<any>) {
    this.disclosureEndpoints = new DisclosureEndpoints()
  }

  async getDisclosures(quoteId: string) {
    let getDisclosures = this.disclosureEndpoints.getDisclosuresEndpoint(quoteId);
    return await this.clientService.getAll(getDisclosures, quoteId).toPromise();
  }

  submitDisclosures(quoteId: string, disclosures) {
    let getDisclosures = this.disclosureEndpoints.getDisclosuresEndpoint(quoteId);
    return this.clientService.put(getDisclosures, disclosures).
      pipe(
        tap(() => {
          this.store.dispatch(acceptDisclosuresAction())
        })
      )
      .toPromise();
  }
}
