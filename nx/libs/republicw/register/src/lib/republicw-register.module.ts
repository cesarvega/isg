import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    CardModule,
    GooglePlaceModule,
    DividerModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
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
