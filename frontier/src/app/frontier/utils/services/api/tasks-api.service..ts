import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { TaskEndpoint } from '../endpoints/task';
import { State, Store } from '@ngrx/store';
import { addClosedTaskAction, setTasksAction } from '../../store/actions';
import { TaskInterface } from '../../store/interfaces/task-interface';
import { map, tap } from 'rxjs/operators';
import { selectQuoteId } from '../../store/selectors';
import { SnapshotStore } from '../state.service';
import { getTaskByNameFromState, isTaskClosedSelector } from '../../store/complexSelectors/taks';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {
  taskEndpoint: TaskEndpoint

  constructor(private clientService: ClientService, private store: Store<any>, private stateService: SnapshotStore) {
    this.taskEndpoint = new TaskEndpoint()
  }

  async getTasks(): Promise<TaskInterface[]> {
    let quoteId = this.stateService.getQuoteId();
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

  async closeTask(taskName: string) {
    let quoteId = this.stateService.getQuoteId();
    let isTaskClosed = this.stateService.select(isTaskClosedSelector(taskName))
    if (isTaskClosed)
      return
    let task = this.stateService.select(getTaskByNameFromState(taskName));
    if (!task) {
      throw new Error(`Task: ${taskName} not foun`)
    }
    let endpoint = this.taskEndpoint.getCompleteTaskEndpoint(quoteId, task.taskId);
    return this.clientService.post(endpoint, null).pipe(
      tap(() => {
        this.store.dispatch(addClosedTaskAction({ taskName: task.specName }));
      })
    ).toPromise();
  }


}
