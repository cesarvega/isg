import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Store } from '@ngrx/store';
import { getValueFromState } from '../../utils/get-value-from-state';
import { ScheduleApiService } from '../../utils/services/api/schedule-api.service';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { CustomerInterface } from '../../utils/services/interfaces/customer/customer';
import { Steps } from '../../utils/steps';
import { setStepAction } from '../../utils/store/actions';
import { selectCustomer } from '../../utils/store/selectors';
import { reserveTaskName } from '../../utils/taskNames';
import { buildScheduleRequest } from './helper/build-schedule-request';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  loading = false;
  error: ErrorInterface;
  selectedEvent;
  customer: CustomerInterface;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 400,
    eventClick: this.handleEvent.bind(this),
  };

  constructor(private taskApiService: TasksApiService, private store: Store<any>,
    private scheduleApiService: ScheduleApiService, private router: Router) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.customer = getValueFromState(this.store.select(selectCustomer));
      let events = await this.getSchedule();
      this.calendarOptions.events = events;
      await this.getTasks;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }

  getInstallationDate(event) {
    return moment(event.startStr).format("LL")
  }

  parseTime(dateTime) {
    return moment(dateTime).format("LT")
  }

  async getTasks(): Promise<any> {
    return await this.taskApiService.getTasks()
  }

  handleEvent(event) {
    this.selectedEvent = event.event;
  }

  async submitSchedule(selectedEvent) {
    try {
      this.loading = true;
      let request = buildScheduleRequest(this.customer, selectedEvent.id);
      await this.scheduleApiService.reserveSchedule(request);
      await this.closeReserveTask();
      this.redirectToRecap();
    }
    catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }

  private redirectToRecap() {
    this.store.dispatch(setStepAction({ step: Steps.recapStep }))
    this.router.navigate([Steps.recapStep.url]);
  }

  private async closeReserveTask() {
    await this.taskApiService.getTasks();
    await this.taskApiService.closeTask(reserveTaskName);
  }

  private async getSchedule() {
    return await this.scheduleApiService.getSchedule();
  }

}
