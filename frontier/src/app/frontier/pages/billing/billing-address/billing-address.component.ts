import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerApiService } from 'src/app/frontier/utils/services/api/customer-api.service';
import { ErrorInterface } from 'src/app/frontier/utils/services/interfaces/common/error-interface';
import { CustomerInterface } from 'src/app/frontier/utils/services/interfaces/customer/customer';
import { SnapshotStore } from 'src/app/frontier/utils/services/state.service';
import { CustomerDataInterface } from 'src/app/frontier/utils/store/interfaces/customer-data';
import { selectCustomer, selectCustomerDataResponse } from 'src/app/frontier/utils/store/selectors';
import { AddressInterface } from 'src/app/isg-shared/interfaces/address';
import { isAddressValid } from '../../credit-check/creditForm/additional-address/helpers/is-address-valid';
import { buildUpdateBillingAddressRquest } from './helpers/billing-address-request';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {

  faArrowRight = faArrowRight;
  loading = false;
  error: ErrorInterface;
  customerData: CustomerDataInterface;
  customerForm: CustomerInterface;
  submitted = false;
  @Output() redirect = new EventEmitter();
  billingAddress: AddressInterface = {
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    stateProvince: "",
    zipCode: ""
  }
  creditForm: FormGroup;
  errorOnUpdateAddress = false;
  showBillingAddressForm = false;
  constructor(private customerApiService: CustomerApiService,
    private snapShotStore: SnapshotStore, private formBuilder: FormBuilder) {
    this.customerData = this.snapShotStore.select(selectCustomerDataResponse)
    this.customerForm = this.snapShotStore.select(selectCustomer);
    this.creditForm = this.formBuilder.group({});
  }

  ngOnInit(): void {

  }

  async onContinue() {
    if (this.showBillingAddressForm) {
      this.submitted = true;
      if (isAddressValid(this.billingAddress)) {
        await this.updateBillingAddress();
      }
      else {
        this.error = { message: "Address is not valid", errors: [] }
      }
    }
    else {
      this.redirect.emit();
    }
  }

  async updateBillingAddress() {
    try {
      this.loading = true;
      const request = buildUpdateBillingAddressRquest(this.customerData, this.billingAddress);
      await this.customerApiService.updateCustomerData(request, this.customerForm);
      this.redirect.emit();
    } catch (error) {
      this.errorOnUpdateAddress = true;
      this.error = error;
    } finally {
      this.loading = false;
    }
  }
}
