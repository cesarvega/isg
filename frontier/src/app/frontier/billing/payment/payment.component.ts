import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { zipCodeValidator } from 'src/app/isg-shared/validators/zipCodeValidator';
import { DepositRequirementsInterface } from '../interfaces/deposit-requirements-interface';
import { PaymentFormInterface } from './interfaces/payment.form.interface';
import { paymentTestCases } from './test-cases/payment.test.cases';
import { customerTypes } from './utils/customer.types';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  customerTypes = customerTypes
  loading: boolean = false;
  submitted: boolean = false;
  testPayments: ReadonlyArray<PaymentFormInterface> = paymentTestCases;
  selectedTestPaymentAlias: string;
  @Input() depositRequirements: DepositRequirementsInterface
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  paymentForm = this.formBuilder.group({
    customerType: ['', [Validators.required]],
    cardNumber: ['', [Validators.required, Validators.maxLength(20)]],
    expirationDate: ['', Validators.required],
    nameOnCard: ['', [Validators.required, Validators.maxLength(200)]],
    securityCode: ['', [Validators.required, Validators.maxLength(4)]],
    zipCode: ['', [Validators.required, zipCodeValidator()]],
  });

  onSelectTestCase(selectedTestCase) {
    let testCase = this.testPayments.find((testPayment) => {
      return testPayment.alias === selectedTestCase
    })
    if (testCase)
      this.patchValue(testCase)
  }

  private patchValue(testCase: PaymentFormInterface) {
    this.paymentForm.patchValue({
      ...testCase
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.paymentForm.valid) {
      alert("Todo correcto")
    }
  }


}
