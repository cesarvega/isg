import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddressComponent } from './containers/address/address.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EarthlinkSharedModule } from '@nx/earthlink/shared';
@NgModule({
  imports: [
    EarthlinkSharedModule,
    FontAwesomeModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: AddressComponent}
    ]),
    ReactiveFormsModule,
  ],
  declarations: [
    AddressComponent,
    AddressFormComponent
  ],
})
export class EarthlinkAddressModule {}
