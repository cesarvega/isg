import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ViewComponent}
    ]),
  ],
  declarations: [
    ViewComponent
  ],
})
export class IsgcrmViewModule {}
