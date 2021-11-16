import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { CalendarModule} from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    InputTextModule,
    TableModule,
    ReactiveFormsModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    FormsModule,
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
