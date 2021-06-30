import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zipCodeValidator } from 'src/app/isg-shared/validators/zipCodeValidator';
import { DepositeApiService } from '../../../utils/services/api/deposit-api.service';
import { ErrorInterface } from '../../../utils/services/interfaces/common/error-interface';
import { ContactInterface, CustomerInterface } from '../../../utils/services/interfaces/customer/customer';
import { DepositRequirementsInterface } from '../interfaces/deposit-requirements-interface';
import { PaymentFormInterface } from './interfaces/payment.form.interface';
import { buildRequestGeneratePaymentToken } from './services/payment-builder.service';
import { paymentTestCases } from './test-cases/payment.test.cases';
import { customerTypes } from './utils/customer.types';
import { lineOfBusiness } from './utils/line-of-business';
import { buildDepositCollectionRequest } from './services/deposit-request-builder.service';
import { DepositRequestInterface } from './interfaces/deposit-request.interface';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  error: ErrorInterface;
  customerTypes = customerTypes;
  loading = false;
  submitted = false;
  testPayments: ReadonlyArray<PaymentFormInterface> = paymentTestCases;
  selectedTestPaymentAlias: string;
  @Input() depositRequirements: DepositRequirementsInterface;
  @Input() customer: CustomerInterface;
  paymentForm: FormGroup;
  @Input() CorrelationId: string;
  @Output() onSuccessDepositEvent = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private depositApiService: DepositeApiService) {
    this.paymentForm = this.formBuilder.group({
      firstName: [this.customer.firstName, [Validators.required]],
      lastName: [this.customer.lastName, [Validators.required]],
      customerType: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.maxLength(20)]],
      expirationDate: ['', Validators.required],
      nameOnCard: ['', [Validators.required, Validators.maxLength(200)]],
      securityCode: ['', [Validators.required, Validators.maxLength(4)]],
      zipCode: ['', [Validators.required, zipCodeValidator()]],
    });
  }

  ngOnInit(): void {

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

  private getEmailFromCustomer = (customer: CustomerInterface) => {
    const primaryContact: ContactInterface = customer.contacts.item.find((contactItem) => {
      return contactItem.primary;
    });
    if (primaryContact) {
      return primaryContact.emailAddresses.item[0].address;
    }
    return '';
  }

  async onSubmit() {
    this.submitted = true;
    if (this.paymentForm.valid) {
      const paymentFormValues = this.paymentForm.value;
      this.loading = true;
      try {
        // generatePaymentToken
        const fundingAccountToken = await this.generatePaymentToken(paymentFormValues, lineOfBusiness, this.CorrelationId);
        // deposit collection
        await this.depositCollection(this.depositRequirements, fundingAccountToken,
          paymentFormValues, this.getEmailFromCustomer(this.customer));

        this.onSuccessDepositEvent.emit();

      } catch (error) {
        this.error = error;
        this.loading = false;
      }
      this.loading = false;


    }
  }

  depositCollection(depositRequirements, fundingAccountToken: string, payment: PaymentFormInterface, email) {
    const request: DepositRequestInterface = buildDepositCollectionRequest(depositRequirements, fundingAccountToken, payment, email);
    return this.depositApiService.depositCollection(request);
  }

  async generatePaymentToken(formValues, lineOfBusiness, CorrelationId: string) {
    const request = buildRequestGeneratePaymentToken(formValues, lineOfBusiness, CorrelationId);
    return await this.depositApiService.generatePaymentToken(this.customer.accountUuid, request);
  }


}
