import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { ContainersComponent } from './containers/account/account.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEarthlinkAccount from './+state/account/earthlink-account.reducer';
import { EarthlinkAccountEffects } from './+state/account/earthlink-account.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ContainersComponent}
    ]),
    StoreModule.forFeature(
      fromEarthlinkAccount.EARTHLINK_ACCOUNT_FEATURE_KEY,
      fromEarthlinkAccount.reducer
    ),
    EffectsModule.forFeature([EarthlinkAccountEffects]),
  ],
  declarations: [ComponentsComponent, ContainersComponent],
})
export class EarthlinkAccountModule {}
