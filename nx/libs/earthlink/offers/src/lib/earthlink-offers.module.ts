import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OffersComponent } from './containers/offers/offers.component';
import { OffersFormComponent } from './components/offers-form/offers-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    OffersComponent,
    OffersFormComponent
  ],
})
export class EarthlinkOffersModule {}
