import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewOrderComponent } from './components/new-order/new-order.component';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    InputTextModule,
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
