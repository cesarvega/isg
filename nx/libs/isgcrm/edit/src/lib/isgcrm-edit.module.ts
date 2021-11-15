import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { DropdownModule } from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {Calendar, CalendarModule} from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ReactiveFormsModule,
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
