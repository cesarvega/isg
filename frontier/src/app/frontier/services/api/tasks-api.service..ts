import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { TaskEndpoint } from '../endpoints/task';
import { Store } from '@ngrx/store';
import { addClosedTaskAction, setTasksAction } from '../../store/actions';
import { TaskInterface } from '../../store/interfaces/task-interface';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {
  taskEndpoint: TaskEndpoint

  constructor(private clientService: ClientService, private store: Store<any>) {
    this.taskEndpoint = new TaskEndpoint()
  }

  async getTasks(quoteId: string) {
    let endpoint = this.taskEndpoint.getTasksEndpoint(quoteId);
    let tasks = await this.clientService.getAll(endpoint).toPromise();
    this.store.dispatch(setTasksAction({ tasks: tasks.currentTasks }))
    return tasks;

  }

  async closeTask(quoteId: string, task: TaskInterface) {
    let endpoint = this.taskEndpoint.getCompleteTaskEndpoint(quoteId, task.taskId);
    await this.clientService.post(endpoint, null).toPromise();
    this.store.dispatch(addClosedTaskAction({taskName:task.specName}));
  }


}
