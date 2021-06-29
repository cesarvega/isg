import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { mapCalendarEvents } from 'src/app/frontier/pages/billing/schedule/helper/map-calendar-events';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { setReservationAction } from '../../store/actions';
import { ScheduleEndpoint } from '../endpoints/schedule';


@Injectable({
  providedIn: 'root'
})
export class ScheduleApiService {
  scheduleEndpoint: ScheduleEndpoint = new ScheduleEndpoint()

  constructor(private clientService: ClientService, private store: Store<any>) {
  }

  async getSchedule(quoteId: string) {
    let url = this.scheduleEndpoint.getScheduleEndpoint();
    return await this.clientService.getAll(url, { quoteId }).pipe(
      map((response) => {
        return mapCalendarEvents(response);
      })
    ).toPromise();
  }

  async reserveSchedule(quoteId, request) {
    let url = this.scheduleEndpoint.getReserveScheduleEndpoint(quoteId);
    return await this.clientService.post(url, request).pipe(
      tap((reservation) => {
        this.store.dispatch(setReservationAction(reservation))
      })
    ).toPromise()
  }


}
