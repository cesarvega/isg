import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';



@NgModule({
  declarations: [
    AddressFormComponent,
    ErrorMessageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddressFormComponent,
    ErrorMessageComponent
  ]
})
export class IsgSharedModule { }
