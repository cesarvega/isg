import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { TaskEndpoint } from '../endpoints/task';
import { Store } from '@ngrx/store';
import { addClosedTaskAction, setTasksAction } from '../../store/actions';
import { TaskInterface } from '../../store/interfaces/task-interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {
  taskEndpoint: TaskEndpoint

  constructor(private clientService: ClientService, private store: Store<any>) {
    this.taskEndpoint = new TaskEndpoint()
  }

  async getTasks(quoteId: string): Promise<TaskInterface[]> {
    let endpoint = this.taskEndpoint.getTasksEndpoint(quoteId);
    return this.clientService.getAll(endpoint).pipe(
      map((response) => {
        return response.currentTasks;
      }),
      tap((tasks) => {
        this.store.dispatch(setTasksAction({ tasks }))
      })
    ).toPromise();
  }

  async closeTask(quoteId: string, task: TaskInterface) {
    let endpoint = this.taskEndpoint.getCompleteTaskEndpoint(quoteId, task.taskId);
    await this.clientService.post(endpoint, null).toPromise();
    this.store.dispatch(addClosedTaskAction({ taskName: task.specName }));
  }


}
