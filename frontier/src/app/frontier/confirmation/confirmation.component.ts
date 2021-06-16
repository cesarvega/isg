import { Component, OnInit } from '@angular/core';
import { ScheduleApiService } from '../services/api/schedule-api.service';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { StateService } from '../services/state.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
import { TasksApiService } from '../services/api/tasks-api.service.';
import { posIdHoldTaskName, quoteValidationTaskName } from '../utils/taskNames';
import { TaskInterface } from '../store/interfaces/task-interface';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  quoteId: string;
  error: ErrorInterface;
  loading: boolean = false;
  posIdHoldTask: TaskInterface;
  quoteValidationTask: TaskInterface;

  constructor(private scheduleApiService: ScheduleApiService, private stateService: StateService,private taskApiService: TasksApiService) { }

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 3),
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 5),
    },
  ];



  ngOnInit(): void {
    this.quoteId = this.stateService.getQuoteId();
    this.getSchedule()
  }

  async getTasks(quoteId){
    this.loading=true;
    try{
     let response= await this.taskApiService.getTasks(quoteId);
     let tasks = response.currentTasks;
     this.posIdHoldTask = tasks.find((iterateTask)=>{
      return iterateTask.specName == posIdHoldTaskName
    })
     await this.taskApiService.closeTask(this.quoteId,this.posIdHoldTask.taskId)
    }catch(error){
      this.error = error;
    }
    this.loading=true;
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

  handleDateClick(arg) {
    debugger
    alert('date click! ' + arg.dateStr)
  }

}
