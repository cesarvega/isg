import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AccountFormInterface } from '../../../utils/services/interfaces/customer/credit-check-form';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() accountFormValues: any;
  accountForm: FormGroup;
  selectedTestCase: string

  constructor(private accountFormBuilder: FormBuilder) { }

  ngOnInit(): void {
    let { firstName, lastName, email, phoneNumber } = this.accountFormValues ?? {}
    this.accountForm = this.accountFormBuilder.group({
      firstName: [firstName, [Validators.required, Validators.maxLength(200)]],
      lastName: [lastName, [Validators.required, Validators.maxLength(200)]],
      email: [email, [Validators.required, Validators.email]],
      phoneNumber: [phoneNumber, [Validators.required]],
      secondaryPhoneNumber: [phoneNumber, [Validators.required]],
    });
  }
  @Output() submitAccountForm = new EventEmitter<any>();
  submitted: Boolean = false;


  onSubmit() {
    this.submitted = true
    if (this.accountForm.valid) {
      this.submitAccountForm.emit(this.accountForm.value);
    }
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
