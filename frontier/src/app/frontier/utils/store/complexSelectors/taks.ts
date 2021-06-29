import { createSelector } from '@ngrx/store';
import { TaskInterface } from '../interfaces/task-interface';
import { selectTasks } from "../selectors";


export const getTaskByNameFromState = (taskName) => {
  return createSelector(
    selectTasks,
    (tasks: TaskInterface[]) => {
      return tasks.find((iterateTask) => {
        return iterateTask.specName == taskName;
      })
    }
  );
}

export const getTasksByNameLocal = (tasks: TaskInterface[], taskName) => {
  return tasks.find((task) => {
    return task.specName == taskName;
  })
}

