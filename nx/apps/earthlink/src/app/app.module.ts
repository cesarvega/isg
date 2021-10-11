import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { FontAwesome } from '@fortawesome/angular-FontAwesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EarthlinkSharedModule } from '@nx/earthlink/shared';
import { EarthlinkLoginModule } from '@nx/earthlink/login';

import { AppComponent } from './app.component';
import { environment } from '@nx/earthlink/env';

import * as fromAddress from '@nx/earthlink/address';
import * as fromOffers from '@nx/earthlink/offers';
import { from } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
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
        path: 'login',
        loadChildren: () =>
          import('@nx/earthlink/login').then(
            (module) => module.EarthlinkLoginModule
          ),
      },
      {
        path: 'earthlink-env',
        loadChildren: () =>
          import('@nx/earthlink/env').then(
            (module) => module.EarthlinkEnvModule
          ),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
