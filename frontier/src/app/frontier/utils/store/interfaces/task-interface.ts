export interface TaskInterface {
  taskId: string,
  specId: string,
  specName: string,
  description: string,
  state: string,
  originatingTask: TaskInterface
}
