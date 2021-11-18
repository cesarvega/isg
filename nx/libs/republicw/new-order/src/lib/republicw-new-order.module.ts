import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewOrderComponent } from './components/new-order/new-order.component';

import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  imports: [
    InputNumberModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    TabViewModule,
    CalendarModule,
    CommonModule,
    RouterModule.forChild([
      {path:'', pathMatch:'full', component: NewOrderComponent}
    ]),
  ],
  declarations: [
    NewOrderComponent
  ],
})
export class RepublicwNewOrderModule {}
