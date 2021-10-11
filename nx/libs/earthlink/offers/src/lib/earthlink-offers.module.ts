import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OffersComponent } from './containers/offers/offers.component';
import { OffersFormComponent } from './components/offers-form/offers-form.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEarthlinkOffers from './+state/offers/earthlink-offers.reducer';
import { EarthlinkOffersEffects } from './+state/offers/earthlink-offers.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OffersComponent },
    ]),
    StoreModule.forFeature(
      fromEarthlinkOffers.EARTHLINK_OFFERS_FEATURE_KEY,
      fromEarthlinkOffers.reducer
    ),
    EffectsModule.forFeature([EarthlinkOffersEffects]),
  ],
  declarations: [OffersComponent, OffersFormComponent],
})
export class EarthlinkOffersModule {}
