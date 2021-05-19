import { Component, OnInit } from '@angular/core';
import { AddressInterface } from '../../isg-shared/interfaces/address';
import { AddressPredictiveSearchInterface } from '../interfaces/address-predictive-search';
import { Store } from '@ngrx/store';
import {
  setStepAction,
} from '../store/actions';
import { selectUser } from '../store/selectors';
import { frontierTestAddresses } from '../utils/test-addresses';
import { Steps } from '../utils/steps';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorInterface } from '../interfaces/error-interface';
import { parseHttperror } from '../utils/helper-functions';
import { Milestone1ApiService } from '../services/milestone1-api.service';
import { UserInterface } from '../interfaces/user-interface';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css'],
})
export class AddressSearchComponent implements OnInit {
  frontierTestAddresses = frontierTestAddresses;
  addressSuscriber$: any;
  addressSearchRequest: AddressPredictiveSearchInterface;
  loading: Boolean = false;
  user: UserInterface;
  userSuscriber;
  error: ErrorInterface = null;

  constructor(
    private milestone1ApiService: Milestone1ApiService,
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userSuscriber = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  async submitAddress(address: AddressInterface) {
    // generate transactionID
    this.loading = true;
    try {
      await this.milestone1ApiService.generateTransactionId();
    } catch (error) {
      this.loading = false;
      this.error = parseHttperror(error);
      return;
    }
    // search Address
    let addressSearchResponse;
    try {
      addressSearchResponse = await this.milestone1ApiService.addressPredictiveSearch(address);
    } catch (error) {
      this.loading = false;
      this.error = parseHttperror(error);
      return;
    }

    // select address

    let selectedAddress = addressSearchResponse.addresses[0];
    // generate quote

    try {
      await this.milestone1ApiService.generateQuote(selectedAddress, this.user.agentId);
      this.loading = false;
      this.store.dispatch(setStepAction({ step: Steps.offersStep }));
      this.router.navigate(['../offers'], { relativeTo: this.route });
    } catch (error) {
      this.loading = false;
      this.error = parseHttperror(error);
      return;
    }
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.userSuscriber.unsubscribe();
  }
}
