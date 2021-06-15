import { MainEndpoint } from "./main-endpoint";

export class ScheduleEndpoint extends MainEndpoint {

  private scheduleEndpoint = "schedule"

  getScheduleEndpoint() {
    return this.buildURL(this.scheduleEndpoint);
  }
}
