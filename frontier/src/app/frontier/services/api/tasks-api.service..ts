import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { TaskEndpoint } from '../endpoints/task';
import { Store } from '@ngrx/store';
import { setTasksAction } from '../../store/actions';

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

  async closeTask(quoteId: string, taskId: String) {
    let endpoint = this.taskEndpoint.getCompleteTaskEndpoint(quoteId, taskId);
    return await this.clientService.post(endpoint, null).toPromise();
  }


}
