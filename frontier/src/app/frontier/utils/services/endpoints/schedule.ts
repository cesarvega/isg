import { MainEndpoint } from "./main-endpoint";

export class ScheduleEndpoint extends MainEndpoint {

  private scheduleEndpoint = "schedule"
  private reserveScheduleEndpoint =  "schedule/reserve/:quoteId";

  getScheduleEndpoint() {
    return this.buildURL(this.scheduleEndpoint);
  }

  getReserveScheduleEndpoint(quoteId) {
    let endpoint = this.reserveScheduleEndpoint.replace(":quoteId",quoteId);
    return this.buildURL(endpoint);
  }
}
