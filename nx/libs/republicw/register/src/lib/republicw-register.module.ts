import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    FormsModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
    RouterModule.forChild([
      {path:'', pathMatch: 'full', component: RegisterComponent}
    ]),
  ],
  declarations: [
    RegisterComponent
  ],
})
export class RepublicwRegisterModule {}
