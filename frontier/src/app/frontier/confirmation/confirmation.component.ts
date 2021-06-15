import { Component, OnInit } from '@angular/core';
import { ScheduleApiService } from '../services/api/schedule-api.service';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { StateService } from '../services/state.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  quoteId: string;
  error: ErrorInterface;
  loading: boolean = false;

  constructor(private scheduleApiService: ScheduleApiService, private stateService: StateService) { }

  calendarOptions: CalendarOptions = {
    themeSystem: 'standard',
    initialView: 'dayGridWeek',
    eventClick: this.handleDateClick.bind(this),
    events: [
      { start: '2021-06-14T10:30:00', id: "abc" },
      { date: '2021-06-15T11:30:00' }
    ]
  };


  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    this.getSchedule()
  }

  private async getSchedule() {
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

  handleDateClick(arg) {
    debugger
    alert('date click! ' + arg.dateStr)
  }

}
