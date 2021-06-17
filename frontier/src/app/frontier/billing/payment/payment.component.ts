import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { zipCodeValidator } from 'src/app/isg-shared/validators/zipCodeValidator';
import { DepositeApiService } from '../../services/api/deposit-api.service';
import { ErrorInterface } from '../../services/interfaces/common/error-interface';
import { CustomerInterface } from '../../services/interfaces/customer/customer';
import { StateService } from '../../services/state.service';
import { selectCustomer } from '../../store/selectors';
import { DepositRequirementsInterface } from '../interfaces/deposit-requirements-interface';
import { PaymentFormInterface } from './interfaces/payment.form.interface';
import { buildRequestGeneratePaymentToken } from './services/payment-builder.service';
import { paymentTestCases } from './test-cases/payment.test.cases';
import { customerTypes } from './utils/customer.types';
import { lineOfBusiness } from './utils/line-of-business';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  error: ErrorInterface
  customerTypes = customerTypes
  loading: boolean = false;
  submitted: boolean = false;
  testPayments: ReadonlyArray<PaymentFormInterface> = paymentTestCases;
  selectedTestPaymentAlias: string;
  @Input() depositRequirements: DepositRequirementsInterface
  customer: CustomerInterface;
  constructor(private formBuilder: FormBuilder, private stateService: StateService, private depositApiService: DepositeApiService) { }

  ngOnInit(): void {
    this.customer = this.stateService.getValueFromSelector(selectCustomer);
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

  async onSubmit() {
    this.submitted = true;
    if (this.paymentForm.valid) {
      let formValues = this.paymentForm.value;
      this.loading = true;
      try {
        // generatePaymentToken
        let tokenResponse = await this.generatePaymentToken(formValues, this.customer, lineOfBusiness);

      } catch (error) {
        this.loading = false;
        this.error = error;

      }
      this.loading = false;


    }
  }

  async generatePaymentToken(formValues, customer: CustomerInterface, lineOfBusiness) {
    let request = buildRequestGeneratePaymentToken(formValues, this.customer, lineOfBusiness);
    return await this.depositApiService.generatePaymentToken(this.customer.accountUuid, request);
  }


}
