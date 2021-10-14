import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import {
//   FontAwesomeModule,
//   FaIconLibrary,
// } from '@fortawesome/angular-FontAwesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EarthlinkSharedModule } from '@nx/earthlink/shared';
import { EarthlinkLoginModule } from '@nx/earthlink/login';

import { AppComponent } from './app.component';
import { environment } from '@nx/earthlink/env';

import * as fromAddress from '@nx/earthlink/address';
import * as fromOffers from '@nx/earthlink/offers';
import * as fromAccount from '@nx/earthlink/account';
import * as fromBilling from '@nx/earthlink/billing';
import * as fromConfirmation from '@nx/earthlink/confirmation';

import { from } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    EarthlinkSharedModule,
    ReactiveFormsModule,
    EarthlinkLoginModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(
      fromAddress.EARTHLINK_ADDRESS_FEATURE_KEY,
      fromAddress.reducer
    ),
    StoreModule.forFeature(
      fromOffers.EARTHLINK_OFFERS_FEATURE_KEY,
      fromOffers.reducer
    ),
    StoreModule.forFeature(
      fromAccount.EARTHLINK_ACCOUNT_FEATURE_KEY,
      fromAccount.reducer
    ),
    StoreModule.forFeature(
      fromBilling.EARTHLINK_BILLING_FEATURE_KEY,
      fromBilling.reducer
    ),
    StoreModule.forFeature(
      fromConfirmation.EARTHLINK_CONFIRMATION_FEATURE_KEY,
      fromConfirmation.reducer
    ),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'address' },
      {
        path: 'address',
        pathMatch: 'full',
        loadChildren: () =>
          import('@nx/earthlink/address').then(
            (module) => module.EarthlinkAddressModule
          ),
      },
      {
        path: 'offers',
        pathMatch: 'full',
        loadChildren: () =>
          import('@nx/earthlink/offers').then(
            (module) => module.EarthlinkOffersModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('@nx/earthlink/login').then(
            (module) => module.EarthlinkLoginModule
          ),
      },
      {
        path: 'logout',
        loadChildren: () =>
          import('@nx/earthlink/logout').then(
            (module) => module.EarthlinkLogoutModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('@nx/earthlink/account').then(
            (module) => module.EarthlinkAccountModule
          ),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('@nx/earthlink/billing').then(
            (module) => module.EarthlinkBillingModule
          ),
      },
      {
        path: 'confirmation',
        loadChildren: () =>
          import('@nx/earthlink/confirmation').then(
            (module) => module.EarthlinkConfirmationModule
          ),
      },
    ]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {

  }
}
