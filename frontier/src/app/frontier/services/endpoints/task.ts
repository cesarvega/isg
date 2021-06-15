import { MainEndpoint } from "./main-endpoint";

export class TaskEndpoint extends MainEndpoint {

  private taskEndPoint = "tasks"
  private getTaks = `${this.taskEndPoint}?quoteId={quoteId}`
  private completeTask = `${this.taskEndPoint}/complete/{taskId}?quoteId={quoteId}`

  getTasksEndpoint(quoteId) {
    let url = this.buildURL(this.getTaks);
    url = url.replace("{quoteId}", quoteId);
    return url
  }

  getCompleteTaskEndpoint(quoteId, taskId) {
    let url = this.buildURL(this.completeTask);
    url = url.replace("{quoteId}", quoteId);
    url = url.replace("{taskId}", taskId);
    return url
  }
}
