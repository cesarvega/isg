import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './containers/confirmation.component';
import { ComponentsComponent } from './components/components.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEarthlinkConfirmation from './+state/confirmation/earthlink-confirmation.reducer';
import { EarthlinkConfirmationEffects } from './+state/confirmation/earthlink-confirmation.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ConfirmationComponent}
    ]),
    StoreModule.forFeature(
      fromEarthlinkConfirmation.EARTHLINK_CONFIRMATION_FEATURE_KEY,
      fromEarthlinkConfirmation.reducer
    ),
    EffectsModule.forFeature([EarthlinkConfirmationEffects]),
  ],
  declarations: [ConfirmationComponent, ComponentsComponent],
})
export class EarthlinkConfirmationModule {}
