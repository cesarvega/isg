import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { FontAwesome } from '@fortawesome/angular-FontAwesome';
import { ReactiveFormsModule } from '@angular/forms';
import { EarthlinkSharedModule } from '@nx/earthlink/shared';
import { EarthlinkLoginModule } from '@nx/earthlink/login';

import { AppComponent } from './app.component';

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
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
