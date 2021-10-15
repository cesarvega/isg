import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { AccountComponent } from './containers/account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EarthlinkSharedModule } from '@nx/earthlink/shared';

@NgModule({
  imports: [
    EarthlinkSharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: AccountComponent}
    ]),
    // StoreModule.forFeature(
    //   fromEarthlinkAccount.EARTHLINK_ACCOUNT_FEATURE_KEY,
    //   fromEarthlinkAccount.reducer
    // ),
    // EffectsModule.forFeature([EarthlinkAccountEffects]),
  ],
  declarations: [ComponentsComponent, AccountComponent],
})
export class EarthlinkAccountModule {}
