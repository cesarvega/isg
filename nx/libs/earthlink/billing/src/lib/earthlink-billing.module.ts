import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { BillingComponent } from './containers/billing.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEarthlinkBilling from './+state/billing/earthlink-billing.reducer';
import { EarthlinkBillingEffects } from './+state/billing/earthlink-billing.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: BillingComponent}
    ]),
    StoreModule.forFeature(
      fromEarthlinkBilling.EARTHLINK_BILLING_FEATURE_KEY,
      fromEarthlinkBilling.reducer
    ),
    EffectsModule.forFeature([EarthlinkBillingEffects]),
  ],
  declarations: [ComponentsComponent, BillingComponent],
})
export class EarthlinkBillingModule {}
