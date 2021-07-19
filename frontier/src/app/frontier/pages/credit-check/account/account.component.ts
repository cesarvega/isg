import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AddressInterface } from 'src/app/isg-shared/interfaces/address';
import { AccountFormInterface } from '../../../utils/services/interfaces/customer/credit-check-form';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() accountFormValues: any;
  accountForm: FormGroup;
  selectedTestCase: string;
  showBillingAddressForm = false;
  billingAddress: AddressInterface = {
    addressLine1: "",
    city: "",
    addressLine2: "",
    postalCode: "",
    stateProvince: "",
    zipCode: ""
  }

  constructor(private accountFormBuilder: FormBuilder) { }

  ngOnInit(): void {
    let { firstName, lastName, email, phoneNumber, secondaryPhoneNumber } = this.accountFormValues ?? {}
    this.accountForm = this.accountFormBuilder.group({
      firstName: [firstName, [Validators.required, Validators.maxLength(200)]],
      lastName: [lastName, [Validators.required, Validators.maxLength(200)]],
      email: [email, [Validators.required, Validators.email]],
      phoneNumber: [phoneNumber, [Validators.required]],
      secondaryPhoneNumber: [secondaryPhoneNumber, [Validators.required]],
    });
  }
  @Output() submitAccountForm = new EventEmitter<any>();
  submitted: Boolean = false;


  onSubmit() {
    this.submitted = true
    if (this.accountForm.valid) {
      if (this.showBillingAddressForm) {
        if (!this.isBillingAddressValid(this.billingAddress)) {
          return;
        }
      }
      let values = this.accountForm.value;
      values.billingAddress = this.billingAddress;
      this.submitAccountForm.emit(values);
    }
  }

  isBillingAddressValid(address: AddressInterface) {
    // validate fields not emptu
    const { addressLine1, city, stateProvince, zipCode } = address;
    if (!addressLine1 || !city || !stateProvince || !zipCode) {
      return false;
    }
    //validate zip code
    let zipCodeRegex: RegExp = /^\d{5}(?:[-\s]\d{4})?$/;
    const expressionMatched = zipCodeRegex.test(zipCode);
    if (!expressionMatched) {
      return false;
    }
    return true;
  }


  private patchValue(testCase: AccountFormInterface) {
    if (this.accountForm)
      this.accountForm.patchValue({ ...testCase });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if (changes['accountFormValues'] && this.accountForm) {
      this.patchValue(this.accountFormValues)
    }
  }

}
