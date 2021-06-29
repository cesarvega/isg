import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { ScheduleEndpoint } from '../endpoints/schedule';


@Injectable({
  providedIn: 'root'
})
export class ScheduleApiService {
  scheduleEndpoint: ScheduleEndpoint = new ScheduleEndpoint()

  constructor(private clientService: ClientService) {
  }

  async getSchedule(quoteId: string) {
    let url = this.scheduleEndpoint.getScheduleEndpoint();
    return await this.clientService.getAll(url, { quoteId }).toPromise();
  }

  async reserveSchedule(quoteId,request){
    let url = this.scheduleEndpoint.getReserveScheduleEndpoint(quoteId);
    return await this.clientService.post(url,request).toPromise()
  }


}
