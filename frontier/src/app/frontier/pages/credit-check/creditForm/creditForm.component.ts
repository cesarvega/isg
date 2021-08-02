import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CreditFormInterface } from 'src/app/frontier/utils/services/interfaces/customer/credit-check-form';
import { AddressInterface } from 'src/app/isg-shared/interfaces/address';
@Component({
  selector: 'app-credit-form',
  templateUrl: './creditForm.component.html',
  styleUrls: ['./creditForm.component.css']
})
export class CreditFormComponent implements OnInit {
  @Input() creditFormValues: any;
  @Input() loading;
  creditForm: FormGroup;
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

  constructor(private creditFormBuilder: FormBuilder) { }

  ngOnInit(): void {
    let { firstName, lastName, email, phoneNumber, secondaryPhoneNumber, dateOfBirth, ssn } = this.creditFormValues ?? {}
    this.creditForm = this.creditFormBuilder.group({
      firstName: [firstName, [Validators.required, Validators.maxLength(200)]],
      lastName: [lastName, [Validators.required, Validators.maxLength(200)]],
      email: [email, [Validators.required, Validators.email]],
      phoneNumber: [phoneNumber, [Validators.required]],
      secondaryPhoneNumber: [secondaryPhoneNumber, [Validators.required]],
      dateOfBirth: [dateOfBirth, [Validators.required]],
      ssn: [ssn, [Validators.required]],
    });
  }
  @Output() submitCreditForm = new EventEmitter<any>();
  submitted: Boolean = false;




  onSubmit() {
    this.submitted = true
    if (this.creditForm.valid) {
      if (this.showBillingAddressForm) {
        if (!this.isBillingAddressValid(this.billingAddress)) {
          return;
        }
      }
      let values = this.creditForm.value;
      if (this.showBillingAddressForm) {
        values.previousAddress = this.billingAddress;
      }
      this.submitCreditForm.emit(values);
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


  private patchValue(testCase: CreditFormInterface) {
    if (this.creditForm)
      this.creditForm.patchValue({ ...testCase });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if (changes['creditFormValues'] && this.creditForm) {
      this.patchValue(this.creditFormValues)
    }
    if (changes['loading'] && this.creditForm) {
      if (this.loading) {
        this.creditForm.disable();
      }
      else {
        this.creditForm.enable();
      }
    }
  }

}
