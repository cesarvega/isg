import { Component, OnInit } from '@angular/core';
import { AddressInterface } from '../../../isg-shared/interfaces/address';
import { AddressPredictiveSearchInterface } from '../../utils/services/interfaces/qualification/address-predictive-search';
import { Store } from '@ngrx/store';
import { setStepAction, setSelectedAddressAction } from '../../utils/store/actions';
import { selectUser, selectSelectedAddress, selectStep } from '../../utils/store/selectors';
import { frontierTestAddresses } from '../../utils/test-addresses';
import { StepInterface, Steps } from '../../utils/steps';
import { Router } from '@angular/router';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { QualificationApiService } from '../../utils/services/api/qualification-api.service';
import { UserInterface } from '../../utils/services/interfaces/common/user-interface';
import { QuoteApiService } from '../../utils/services/api/quote-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressSelectorComponent } from './address-selector/address-selector.component';
import { Observable, Subscription } from 'rxjs';
import { AddressSearchResponseItemInterface } from '../../utils/services/interfaces/qualification/address-search-response';
import { getParsedAddress } from './helpers/get-parsed-adress';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css'],
})
export class AddressSearchComponent implements OnInit {
  selectedAddress$: Observable<AddressSearchResponseItemInterface>;
  frontierTestAddresses = frontierTestAddresses;
  addressSuscriber$: any;
  addressSearchRequest: AddressPredictiveSearchInterface;
  loading: Boolean = false;
  user: UserInterface;
  userSuscriber$: Subscription;
  error: ErrorInterface = null;
  currentStep: StepInterface;

  public getParsedAddress = getParsedAddress;
  constructor(
    private qualificationApiService: QualificationApiService,
    private quoteApiService: QuoteApiService,
    private store: Store<any>,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.selectedAddress$ = this.store.select(selectSelectedAddress);
    this.userSuscriber$ = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  getCurrentStep() {
    let currentStep;
    this.store.select(selectStep).subscribe((step) => {
      currentStep = step;
    }).unsubscribe();
    return currentStep;
  }


  canAccessQualification() {
    let step: StepInterface = this.getCurrentStep();
    if (!step)
      return true;
    return step.step < 2;
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
    this.loading = true;
    try {
      await this.quoteApiService.generateQuote(address, this.user.agentId);
    } catch (error) {
      this.loading = false;
      this.error = error;
      return;
    }
    this.loading = false;
    this.navigateToOffers()
  }

  navigateToOffers() {
    this.store.dispatch(setStepAction({ step: Steps.offersStep }));
    this.router.navigate([Steps.offersStep.url]);
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
    this.store.dispatch(setSelectedAddressAction(address));
    this.generateQuote(address);
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.userSuscriber$.unsubscribe();
  }


}
