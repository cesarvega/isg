import { Component, OnInit } from '@angular/core';
import { DepositeApiService } from '../services/api/deposit-api.service';
import { TasksApiService } from '../services/api/tasks-api.service.';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { StateService } from '../services/state.service';
import { setReservationAction } from '../store/actions';
import { TaskInterface } from '../store/interfaces/task-interface';
import { selectDepositRequirements } from '../store/selectors';
import { posIdHoldTaskName } from '../utils/taskNames';
import { DepositRequirementsInterface } from './interfaces/deposit-requirements-interface';

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

  constructor(private depositApiService: DepositeApiService, private stateService: StateService, private taskApiService: TasksApiService) { }

  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    this.depositRequirements = this.stateService.getValueFromSelector(selectDepositRequirements);
    this.initComponent(this.quoteId, this.depositRequirements);

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

  async getTasks(quoteId): Promise<any> {
    return await this.taskApiService.getTasks(quoteId)
  }

  async getDepositRequirements(quoteId) {
    return this.depositApiService.getDepositRequirements(quoteId)
  }

}
