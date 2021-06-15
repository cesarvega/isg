export interface TaskInterface {
  taskId: String,
  specId: String,
  specName: String,
  description: String,
  state: String,
  originatingTask: TaskInterface
}
