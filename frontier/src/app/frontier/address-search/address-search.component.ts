import { Component, OnInit } from '@angular/core';
import { AddressInterface } from '../../isg-shared/interfaces/address';
import { AddressPredictiveSearchInterface } from '../services/interfaces/qualification/address-predictive-search';
import { Store } from '@ngrx/store';
import { setStepAction, setCustomerAction } from '../store/actions';
import { selectUser, selectSelectedAddress } from '../store/selectors';
import { frontierTestAddresses } from '../utils/test-addresses';
import { Steps } from '../utils/steps';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { parseHttperror } from '../utils/helper-functions';
import { QualificationApiService } from '../services/api/qualification-api.service';
import { UserInterface } from '../services/interfaces/common/user-interface';
import { QuoteApiService } from '../services/api/quote-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressSelectorComponent } from './address-selector/address-selector.component';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css'],
})
export class AddressSearchComponent implements OnInit {
  selectedAddress;
  frontierTestAddresses = frontierTestAddresses;
  addressSuscriber$: any;
  addressSearchRequest: AddressPredictiveSearchInterface;
  loading: Boolean = false;
  user: UserInterface;
  userSuscriber;
  error: ErrorInterface = null;

  constructor(
    private qualificationApiService: QualificationApiService,
    private quoteApiService: QuoteApiService,
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private stateService: StateService
  ) {
    this.selectedAddress = this.stateService.getValueFromSelector(selectSelectedAddress)
    this.userSuscriber = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  async submitAddress(address: AddressInterface) {
    this.loading = true;
    try {
      // generate transactionID
      await this.quoteApiService.generateTransactionId();
      let requestAddress = { address: address.addressLine1, ...address }
      delete requestAddress.addressLine1
      // search Address
      let addresses = await this.qualificationApiService.addressExhaustiveSearch(requestAddress);

      if (addresses.length == 1) {
        await this.generateQuote(addresses[0]);
      } else {
        this.openModal(addresses);
      }
    }
    catch (error) {
      this.error = error;
      this.loading = false;
      return;
    }
  }

  private async generateQuote(address) {
    try {
      this.loading = true;
      let quoteResponse = await this.quoteApiService.generateQuote(address, this.user.agentId);
      if (quoteResponse.customer) {
        this.store.dispatch(setCustomerAction({ customer: quoteResponse.customer }));
      }
      this.loading = false;
      this.store.dispatch(setStepAction({ step: Steps.offersStep }));
      this.router.navigate(['../offers'], { relativeTo: this.route });
    } catch (error) {
      this.loading = false;
      this.error = error;
      return;
    }
  }

  openModal(addresses) {
    const modalRef = this.modalService.open(AddressSelectorComponent);
    modalRef.componentInstance.addresses = addresses;
    modalRef.componentInstance.selectAddress.subscribe((address) => {
      modalRef.close();
      this.onSelectAddress(address)
    })
  }

  private onSelectAddress(address: AddressInterface) {
    this.selectedAddress = address;
    this.generateQuote(address);
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.userSuscriber.unsubscribe();
  }


}
