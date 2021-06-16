import { Component, OnInit } from '@angular/core';
import { DepositeApiService } from '../services/api/deposit-api.service';
import { TasksApiService } from '../services/api/tasks-api.service.';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { StateService } from '../services/state.service';
import { setReservationAction } from '../store/actions';
import { TaskInterface } from '../store/interfaces/task-interface';
import { posIdHoldTaskName } from '../utils/taskNames';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  loading : boolean = false;
  error: ErrorInterface;
  quoteId: string;
  tasks: TaskInterface[] = [];
  postIdHoldTask: TaskInterface;

  constructor(private depositApiService: DepositeApiService,private stateService:StateService,private taskApiService: TasksApiService) { }

  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    this.initComponent(this.quoteId);
  }

  async initComponent(quoteId){
    this.loading = true;
    try{
      // get tasks
      let tasks = await this.getTasks(quoteId);
      this.tasks = tasks.currentTasks;
      // get postIdHoldTask
      this.postIdHoldTask = this.getTask(this.tasks,posIdHoldTaskName);

      // close task if exists
      if(this.postIdHoldTask){
        await this.closeTask(quoteId,this.postIdHoldTask)
      }

      // get deposit requirements
      let depositRequirements = await this.getDepositRequirements(quoteId)
      console.log(depositRequirements)
      this.loading = false;
    }catch(error){
      this.loading= false;
      this.error = error;
    }
  }

  async closeTask(quoteId,task:TaskInterface){
    if(!this.stateService.isTaskClosed(task.specName))
      await this.taskApiService.closeTask(quoteId,task);
  }

   getTask(tasks:TaskInterface[],taskName){
     return tasks.find((iterateTask: TaskInterface)=>{
      return iterateTask.specName == taskName
     })

  }

  async getTasks(quoteId): Promise<any>{
    return await this.taskApiService.getTasks(quoteId)
  }

  async getDepositRequirements(quoteId){
      return await this.depositApiService.getDepositRequirements(quoteId);
  }

}
