import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { states } from '../../../utils/states';
import { Validators } from '@angular/forms';
import { zipCodeValidator } from '../validators/zipCodeValidator';
import { Output, EventEmitter } from '@angular/core';
import { AddressInterface } from '../interfaces/address';
import { AddressFormInterface } from '../../frontier/utils/test-addresses';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  constructor(private addressFormBuilder: FormBuilder) { }

  @Input() testAddresses: Array<AddressFormInterface>;
  @Input() loading: boolean;
  @Input() error: any;
  @Output() submitAddressEvent = new EventEmitter<AddressInterface>();
  states: any[] = states;
  submitted: boolean = false;
  selectedTestAlias: string;

  addressForm = this.addressFormBuilder.group({
    addressLine1: ['', [Validators.required, Validators.maxLength(100)]],
    addressLine2: ['', Validators.maxLength(40)],
    city: ['', [Validators.required, Validators.maxLength(50)]],
    stateProvince: ['', Validators.required],
    zipCode: ['', [Validators.required, zipCodeValidator()]],
  });


  get addressLine1() { return this.addressForm.get('addressLine1'); }
  get city() { return this.addressForm.get('city'); }
  get zipCode() { return this.addressForm.get('zipCode'); }
  get state() { return this.addressForm.get('state'); }

  isFormInvalid(control: AbstractControl) {
    if (control.invalid && (control.dirty || control.touched || this.submitted)) {
      return true
    }
    return false
  }

  onSubmit() {
    this.submitted = true;
    if (this.addressForm.valid) {
      this.submitAddressEvent.emit(this.addressForm.value);
    }
  }

  onSelectTestAddress() {
    let address = this.testAddresses.find((address) => {
      return address.alias === this.selectedTestAlias
    })
    if (address)
      this.patchValue(address)
  }

  private patchValue(address: AddressFormInterface) {
    this.addressForm.patchValue({
      addressLine1: address.addressLine1,
      addressLine2: '',
      city: address.city,
      stateProvince: address.stateProvince,
      zipCode: address.zipCode,
    });
  }

  ngOnInit(): void {

  }

}
