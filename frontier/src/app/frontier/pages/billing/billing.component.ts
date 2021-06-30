import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DepositeApiService } from '../../utils/services/api/deposit-api.service';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { CustomerInterface } from '../../utils/services/interfaces/customer/customer';
import { StateService } from '../../utils/services/state.service';
import { Steps } from '../../utils/steps';
import { setStepAction } from '../../utils/store/actions';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { selectCorrelationId, selectCustomer, selectDepositCollectionResponse, selectDepositRequirements } from '../../utils/store/selectors';
import { customerNeedsDepositHelper } from './helpers/customer-needs-deposit';
import { DepositRequirementsInterface } from './interfaces/deposit-requirements-interface';
import { DepositCollectionResponseInterface } from './payment/interfaces/deposit-collection-response.interface';
import { DepositResponse } from './payment/interfaces/deposit-requirements-response.interface';

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

  constructor(private depositApiService: DepositeApiService, private stateService: StateService, private taskApiService: TasksApiService, private router: Router) {
    this.customer = this.stateService.getValueFromSelector(selectCustomer);
    this.CorrelationId = this.stateService.getValueFromSelector(selectCorrelationId);
  }

  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    this.depositRequirements = this.stateService.getValueFromSelector(selectDepositRequirements);
    this.depositCollectionResponse = this.stateService.getValueFromSelector(selectDepositCollectionResponse);
    this.initComponent(this.quoteId, this.depositRequirements);

  }

  isPaymentComplete() {
    return this.successDeposit || this.depositCollectionResponse || !this.customerNeedsDeposit
  }

  async initComponent(quoteId, depositRequirements) {
    this.loading = true;
    try {
      // get tasks
      this.tasks = await this.getTasks(quoteId);

      // get deposit requirements
      if (!depositRequirements)
        this.depositRequirements = await this.getDepositRequirements(quoteId)
      this.customerNeedsDeposit = customerNeedsDepositHelper(this.depositRequirements);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
  }

  async closeTask(quoteId, task: TaskInterface) {
    if (!this.stateService.isTaskClosed(task.specName))
      await this.taskApiService.closeTask(quoteId, task);
  }

  getTaskByName(tasks: TaskInterface[], taskName) {
    return tasks.find((iterateTask: TaskInterface) => {
      return iterateTask.specName == taskName
    })
  }

  onSuccessDeposit() {
    this.accordionComponent.toggle('payment-panel')
    this.successDeposit = true;
  }

  onSuccessScheduleEvent() {
    this.stateService.dispatchAction(setStepAction({ step: Steps.confirmationStep }))
    this.router.navigate([Steps.confirmationStep.url]);
  }

  async getTasks(quoteId): Promise<any> {
    return await this.taskApiService.getTasks(quoteId)
  }

  async getDepositRequirements(quoteId): Promise<DepositResponse> {
    return this.depositApiService.getDepositRequirements(quoteId)
  }

}
