import { Component, OnInit } from '@angular/core';
import { ScheduleApiService } from '../../../utils/services/api/schedule-api.service';
import { ErrorInterface } from '../../../utils/services/interfaces/common/error-interface';
import { StateService } from '../../../utils/services/state.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { TasksApiService } from '../../../utils/services/api/tasks-api.service.';
import { TaskInterface } from '../../../utils/store/interfaces/task-interface';
import * as moment from 'moment';
import { setReservationAction } from '../../../utils/store/actions';
import { CustomerInterface } from 'src/app/frontier/utils/services/interfaces/customer/customer';
import { selectCustomer } from 'src/app/frontier/utils/store/selectors';
import { buildScheduleRequest } from './helper/build-schedule-request';
import { Output, EventEmitter } from '@angular/core';
import { getTasksByNameLocal } from 'src/app/frontier/utils/store/complexSelectors/taks';
import { reserveTaskName } from 'src/app/frontier/utils/taskNames';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Output() onSuccessScheduleEvent = new EventEmitter<void>();
  quoteId: string;
  error: ErrorInterface;
  loading: boolean = false;
  posIdHoldTask: TaskInterface;
  quoteValidationTask: TaskInterface;
  selectedEvent;
  customer: CustomerInterface;

  constructor(private scheduleApiService: ScheduleApiService, private stateService: StateService, private taskApiService: TasksApiService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 400,
    eventClick: this.handleEvent.bind(this),
  };

  handleEvent(event) {
    this.selectedEvent = event.event;
  }

  getSelectedEventTitle(startstring) {
    return moment(startstring).format("LLL")

  }

  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    this.customer = this.stateService.getValueFromSelector(selectCustomer);
    this.getSchedule()
  }

  async submitSchedule(selectedEvent, quoteId) {

    try {
      this.loading = true;
      let request = buildScheduleRequest(this.customer, selectedEvent.id);
      await this.scheduleApiService.reserveSchedule(quoteId, request);
      this.closeReserveTask(quoteId)
      this.onSuccessScheduleEvent.emit();
    }
    catch (error) {
      this.loading = false;
      this.error = error;
    }
    this.loading = false;
  }

  private async closeReserveTask(quoteId) {
    let tasks = await this.taskApiService.getTasks(quoteId);
    let reserveTask = getTasksByNameLocal(tasks, reserveTaskName);
    if (!reserveTask)
      throw new Error("Could not get reserve task")
    await this.taskApiService.closeTask(quoteId, reserveTask);
  }


  private async getSchedule() {
    this.loading = true;
    try {
      let events = await this.scheduleApiService.getSchedule(this.quoteId)
      this.calendarOptions.events = events;
    } catch (error) {
      this.error = error;
    }
    this.loading = false;
  }
}
