import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DepositeApiService } from '../../utils/services/api/deposit-api.service';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { ContactInterface, CustomerInterface } from '../../utils/services/interfaces/customer/customer';
import { SnapshotStore } from '../../utils/services/state.service';
import { Steps } from '../../utils/steps';
import { setStepAction } from '../../utils/store/actions';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { selectCorrelationId, selectCustomer, selectDepositRequirements } from '../../utils/store/selectors';
import { customerNeedsDepositHelper } from './helpers/customer-needs-deposit';
import { DepositCollectionResponseInterface } from './payment/interfaces/deposit-collection-response.interface';
import { DepositRequestInterface } from './payment/interfaces/deposit-request.interface';
import { DepositResponse } from './payment/interfaces/deposit-requirements-response.interface';
import { PaymentFormInterface } from './payment/interfaces/payment.form.interface';
import { buildDepositCollectionRequest, getTotalPayment } from './payment/services/deposit-request-builder.service';
import { buildRequestGeneratePaymentToken } from './payment/services/payment-builder.service';
import { lineOfBusiness } from './payment/utils/line-of-business';
import { environment } from 'src/environments/environment';
import { posIdHoldTaskName } from '../../utils/taskNames';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  loading: boolean = false;
  error: ErrorInterface;
  quoteId: string;
  tasks: TaskInterface[] = [];
  postIdHoldTask: TaskInterface;
  depositRequirements: DepositResponse = null;
  successDeposit = false;
  depositCollectionResponse: Observable<DepositCollectionResponseInterface>;
  @ViewChild('accordion') accordionComponent: NgbAccordion;
  customer: CustomerInterface = null;
  CorrelationId: string;
  customerNeedsDeposit = true;
  totalDueToday = 0;

  constructor(private depositApiService: DepositeApiService, private snapShotStore: SnapshotStore, private taskApiService: TasksApiService, private router: Router) {


  }


  async ngOnInit() {
    this.loading = true;
    try {
      this.customer = this.snapShotStore.select(selectCustomer);
      this.CorrelationId = this.snapShotStore.select(selectCorrelationId);
      // get tasks
      await this.getTasks();
      // close post id task, only in dev environment
      if (!environment.production) {
        await this.taskApiService.closeTask(posIdHoldTaskName);
      }
      // get deposit requirements
      this.depositRequirements = await this.getDepositRequirements();
      this.totalDueToday = getTotalPayment(this.depositRequirements);
      this.customerNeedsDeposit = customerNeedsDepositHelper(this.depositRequirements);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
  }

  isPaymentComplete() {
    return this.successDeposit || this.depositCollectionResponse || !this.customerNeedsDeposit
  }

  redirectToSchedule() {
    this.snapShotStore.dispatch(setStepAction({ step: Steps.scheduleStep }))
    this.router.navigate([Steps.scheduleStep.url]);
  }

  async getTasks(): Promise<any> {
    return await this.taskApiService.getTasks()
  }

  async getDepositRequirements(): Promise<DepositResponse> {
    let depositRequirements = this.snapShotStore.select(selectDepositRequirements);
    if (!depositRequirements)
      depositRequirements = await this.depositApiService.getDepositRequirements()
    return depositRequirements
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

  async submitPayment(paymentFormValues) {
    this.loading = true;
    try {
      // generatePaymentToken
      const fundingAccountToken = await this.generatePaymentToken(paymentFormValues, lineOfBusiness, this.CorrelationId);
      // deposit collection
      await this.depositCollection(this.depositRequirements, fundingAccountToken,
        paymentFormValues, this.getEmailFromCustomer(this.customer));

      this.redirectToSchedule();

    } catch (error) {
      this.error = error;
      this.loading = false;
    }
    this.loading = false;
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
