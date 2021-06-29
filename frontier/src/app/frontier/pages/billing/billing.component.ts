import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DepositeApiService } from '../../utils/services/api/deposit-api.service';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { StateService } from '../../utils/services/state.service';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { selectDepositCollectionResponse, selectDepositRequirements } from '../../utils/store/selectors';
import { DepositRequirementsInterface } from './interfaces/deposit-requirements-interface';
import { DepositCollectionResponseInterface } from './payment/interfaces/deposit-collection-response.interface';

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
  depositRequirements: DepositRequirementsInterface = null;
  successDeposit = false;
  depositCollectionResponse: Observable<DepositCollectionResponseInterface>;
  @ViewChild('accordion') accordionComponent: NgbAccordion;

  constructor(private depositApiService: DepositeApiService, private stateService: StateService, private taskApiService: TasksApiService) { }

  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    this.depositRequirements = this.stateService.getValueFromSelector(selectDepositRequirements);
    this.depositCollectionResponse = this.stateService.getValueFromSelector(selectDepositCollectionResponse);
    this.initComponent(this.quoteId, this.depositRequirements);

  }

  isPaymentComplete() {
    return this.successDeposit || this.depositCollectionResponse
  }

  async initComponent(quoteId, depositRequirements) {
    this.loading = true;
    try {
      // get tasks
      let tasks = await this.getTasks(quoteId);
      this.tasks = tasks.currentTasks;

      // get deposit requirements
      if (!depositRequirements)
        this.depositRequirements = await this.getDepositRequirements(quoteId)
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

  async getTasks(quoteId): Promise<any> {
    return await this.taskApiService.getTasks(quoteId)
  }

  async getDepositRequirements(quoteId) {
    return this.depositApiService.getDepositRequirements(quoteId)
  }

}
