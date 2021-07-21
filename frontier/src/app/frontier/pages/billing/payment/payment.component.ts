import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zipCodeValidator } from 'src/app/isg-shared/validators/zipCodeValidator';
import { DepositeApiService } from '../../../utils/services/api/deposit-api.service';
import { ErrorInterface } from '../../../utils/services/interfaces/common/error-interface';
import { CustomerInterface } from '../../../utils/services/interfaces/customer/customer';
import { PaymentFormInterface } from './interfaces/payment.form.interface';
import { paymentTestCases } from './test-cases/payment.test.cases';
import { customerTypes } from './utils/customer.types';
import { buildDepositCollectionRequest, getTotalPayment } from './services/deposit-request-builder.service';
import { Output, EventEmitter } from '@angular/core';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { DepositResponse } from './interfaces/deposit-requirements-response.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  faComment = faComment;
  error: ErrorInterface;
  customerTypes = customerTypes;
  submitted = false;
  testPayments: ReadonlyArray<PaymentFormInterface> = paymentTestCases;
  selectedTestPaymentAlias: string;
  @Input() depositRequirements: DepositResponse;
  @Input() customer: CustomerInterface;
  paymentForm: FormGroup;
  @Input() CorrelationId: string;
  @Output() submitPayment = new EventEmitter<void>();
  @Input() loading;
  totalDueToday: number;
  showBillingForm = false;

  constructor(private formBuilder: FormBuilder, private depositApiService: DepositeApiService) {
    this.paymentForm = this.formBuilder.group({
      firstName: [this.customer?.firstName, [Validators.required]],
      lastName: [this.customer?.lastName, [Validators.required]],
      customerType: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.maxLength(16)]],
      expirationDate: ['', Validators.required],
      nameOnCard: ['', [Validators.required, Validators.maxLength(200)]],
      securityCode: ['', [Validators.required, Validators.maxLength(4)]],
      zipCode: ['', [Validators.required, zipCodeValidator()]],
    });
  }

  ngOnInit(): void {
    this.totalDueToday = getTotalPayment(this.depositRequirements);
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if (changes['customer'] && this.paymentForm) {
      const { firstName, lastName } = this.customer;
      this.paymentForm.patchValue({ firstName, lastName })
    }
  }

  onSelectTestCase(selectedTestCase) {
    const testCase = this.testPayments.find((testPayment) => {
      return testPayment.alias === selectedTestCase;
    });
    if (testCase) {
      this.patchValue(testCase);
    }
  }

  private patchValue(testCase: PaymentFormInterface) {
    this.paymentForm.patchValue({
      ...testCase
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.paymentForm.valid) {
      this.submitPayment.emit(this.paymentForm.value);
    }
  }

}
