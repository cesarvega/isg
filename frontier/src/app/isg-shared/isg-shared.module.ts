import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddressFormComponent
  ],
  imports: [
    FormsModule  ,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    AddressFormComponent
  ]
})
export class IsgSharedModule { }
