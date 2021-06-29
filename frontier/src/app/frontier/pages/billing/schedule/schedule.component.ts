import { Component, OnInit } from '@angular/core';
import { ScheduleApiService } from '../../../utils/services/api/schedule-api.service';
import { ErrorInterface } from '../../../utils/services/interfaces/common/error-interface';
import { StateService } from '../../../utils/services/state.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { TasksApiService } from '../../../utils/services/api/tasks-api.service.';
import { posIdHoldTaskName, quoteValidationTaskName } from '../../../utils/taskNames';
import { TaskInterface } from '../../../utils/store/interfaces/task-interface';
import * as moment from 'moment';
import { setReservationAction } from '../../../utils/store/actions';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  quoteId: string;
  error: ErrorInterface;
  loading: boolean = false;
  posIdHoldTask: TaskInterface;
  quoteValidationTask: TaskInterface;
  selectedEvent;

  constructor(private scheduleApiService: ScheduleApiService, private stateService: StateService, private taskApiService: TasksApiService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 400,
    eventClick: this.handleEvent.bind(this),
  };

  handleEvent(event) {
    this.selectedEvent = event.event;
  }

  getSelectedEventTitle(startString) {
    return moment(startString).format("LLL")

  }



  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    //this.getSchedule()
    this.mapEvents()
  }

  mapEvents() {
    let mockEvents = [{ "scheduleId": 13343098, "earliestStartTime": "2021-06-16T18:00:00.000Z", "latestStartTime": "2021-06-16T22:00:00.000Z", "dayOfWeek": "Wed", "appointmentCode": "4" }, { "scheduleId": 13343120, "earliestStartTime": "2021-06-17T13:00:00.000Z", "latestStartTime": "2021-06-17T17:00:00.000Z", "dayOfWeek": "Thu", "appointmentCode": "4" }, { "scheduleId": 13343125, "earliestStartTime": "2021-06-17T18:00:00.000Z", "latestStartTime": "2021-06-17T22:00:00.000Z", "dayOfWeek": "Thu", "appointmentCode": "4" }, { "scheduleId": 13343147, "earliestStartTime": "2021-06-18T13:00:00.000Z", "latestStartTime": "2021-06-18T17:00:00.000Z", "dayOfWeek": "Fri", "appointmentCode": "4" }, { "scheduleId": 13343152, "earliestStartTime": "2021-06-18T18:00:00.000Z", "latestStartTime": "2021-06-18T22:00:00.000Z", "dayOfWeek": "Fri", "appointmentCode": "4" }, { "scheduleId": 13343174, "earliestStartTime": "2021-06-19T13:00:00.000Z", "latestStartTime": "2021-06-19T17:00:00.000Z", "dayOfWeek": "Sat", "appointmentCode": "4" }, { "scheduleId": 13343179, "earliestStartTime": "2021-06-19T18:00:00.000Z", "latestStartTime": "2021-06-19T22:00:00.000Z", "dayOfWeek": "Sat", "appointmentCode": "4" }, { "scheduleId": 13343228, "earliestStartTime": "2021-06-21T13:00:00.000Z", "latestStartTime": "2021-06-21T17:00:00.000Z", "dayOfWeek": "Mon", "appointmentCode": "4" }, { "scheduleId": 13343233, "earliestStartTime": "2021-06-21T18:00:00.000Z", "latestStartTime": "2021-06-21T22:00:00.000Z", "dayOfWeek": "Mon", "appointmentCode": "4" }, { "scheduleId": 13343255, "earliestStartTime": "2021-06-22T13:00:00.000Z", "latestStartTime": "2021-06-22T17:00:00.000Z", "dayOfWeek": "Tue", "appointmentCode": "4" }, { "scheduleId": 13343260, "earliestStartTime": "2021-06-22T18:00:00.000Z", "latestStartTime": "2021-06-22T22:00:00.000Z", "dayOfWeek": "Tue", "appointmentCode": "4" }, { "scheduleId": 13343282, "earliestStartTime": "2021-06-23T13:00:00.000Z", "latestStartTime": "2021-06-23T17:00:00.000Z", "dayOfWeek": "Wed", "appointmentCode": "4" }, { "scheduleId": 13343287, "earliestStartTime": "2021-06-23T18:00:00.000Z", "latestStartTime": "2021-06-23T22:00:00.000Z", "dayOfWeek": "Wed", "appointmentCode": "4" }, { "scheduleId": 13343309, "earliestStartTime": "2021-06-24T13:00:00.000Z", "latestStartTime": "2021-06-24T17:00:00.000Z", "dayOfWeek": "Thu", "appointmentCode": "4" }, { "scheduleId": 13343314, "earliestStartTime": "2021-06-24T18:00:00.000Z", "latestStartTime": "2021-06-24T22:00:00.000Z", "dayOfWeek": "Thu", "appointmentCode": "4" }, { "scheduleId": 13343336, "earliestStartTime": "2021-06-25T13:00:00.000Z", "latestStartTime": "2021-06-25T17:00:00.000Z", "dayOfWeek": "Fri", "appointmentCode": "4" }, { "scheduleId": 13343341, "earliestStartTime": "2021-06-25T18:00:00.000Z", "latestStartTime": "2021-06-25T22:00:00.000Z", "dayOfWeek": "Fri", "appointmentCode": "4" }, { "scheduleId": 13343363, "earliestStartTime": "2021-06-26T13:00:00.000Z", "latestStartTime": "2021-06-26T17:00:00.000Z", "dayOfWeek": "Sat", "appointmentCode": "4" }, { "scheduleId": 13343368, "earliestStartTime": "2021-06-26T18:00:00.000Z", "latestStartTime": "2021-06-26T22:00:00.000Z", "dayOfWeek": "Sat", "appointmentCode": "4" }, { "scheduleId": 13343417, "earliestStartTime": "2021-06-28T13:00:00.000Z", "latestStartTime": "2021-06-28T17:00:00.000Z", "dayOfWeek": "Mon", "appointmentCode": "4" }, { "scheduleId": 13343422, "earliestStartTime": "2021-06-28T18:00:00.000Z", "latestStartTime": "2021-06-28T22:00:00.000Z", "dayOfWeek": "Mon", "appointmentCode": "4" }, { "scheduleId": 13343444, "earliestStartTime": "2021-06-29T13:00:00.000Z", "latestStartTime": "2021-06-29T17:00:00.000Z", "dayOfWeek": "Tue", "appointmentCode": "4" }, { "scheduleId": 13343449, "earliestStartTime": "2021-06-29T18:00:00.000Z", "latestStartTime": "2021-06-29T22:00:00.000Z", "dayOfWeek": "Tue", "appointmentCode": "4" }]
    let mappedEvents = mockEvents.map((iterateMockEvent) => {
      let parsedDate = new Date(iterateMockEvent.earliestStartTime)
      let mappedEvent = {
        ...iterateMockEvent,
        id: iterateMockEvent.scheduleId.toString(),
        start: parsedDate
      }
      return mappedEvent;
    })
    this.calendarOptions.events = mappedEvents;
    //  this.events = mappedEvents;
  }

  async submitSchedule(selectedEvent, quoteId) {
    let request = {
      scheduleId: selectedEvent.id
    }
    try {
      this.loading = true;
      let reservation = await this.scheduleApiService.reserveSchedule(quoteId, request);
      this.stateService.dispatchAction(setReservationAction(reservation))
    }
    catch (error) {
      this.loading = false;
      this.error = error;
    }
    this.loading = false;
  }


  async getTasks(quoteId) {
    this.loading = true;
    try {
      let response = await this.taskApiService.getTasks(quoteId);
      let tasks = response.currentTasks;
      this.posIdHoldTask = tasks.find((iterateTask) => {
        return iterateTask.specName == posIdHoldTaskName
      })
      await this.taskApiService.closeTask(this.quoteId, this.posIdHoldTask)
    } catch (error) {
      this.error = error;
    }
    this.loading = true;
  }

  private async getSchedule() {
    await this.getTasks(this.quoteId);
    this.loading = true;
    try {
      let schedules = await this.scheduleApiService.getSchedule(this.quoteId)
      let events = schedules.map((schedule) => {
        return { id: schedule.id, start: schedule.earliestStartTime, backgroundColor: "red" }
      })
      console.log(schedules)
      ///this.calendarOptions.events = events;
    } catch (error) {
      this.error = error;
    }
    this.loading = false;
  }
}
