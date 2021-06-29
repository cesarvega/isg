import { createSelector } from '@ngrx/store';
import { TaskInterface } from '../interfaces/task-interface';
import { selectTasks } from "../selectors";


export const getTaskByName = (taskName) => {
  return createSelector(
    selectTasks,
    (tasks: TaskInterface[]) => {
      return tasks.find((iterateTask) => {
        return iterateTask.specName == taskName;
      })
    }
  );
}
