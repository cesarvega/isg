import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { DropdownModule } from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {Calendar, CalendarModule} from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  imports: [
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: FormComponent}
    ]),
  ],
  declarations: [
    FormComponent
  ],
  exports:[
    FormComponent,
  ]
})
export class IsgcrmEditModule {}
