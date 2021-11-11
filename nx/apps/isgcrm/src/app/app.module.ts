import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IsgcrmCommonModule } from '@nx/isgcrm/common';
import { IsgcrmLoginModule } from '@nx/isgcrm/login';
import { IsgcrmProductsModule } from '@nx/isgcrm/products';

import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [AppComponent],
  imports: [
    InputTextModule,
    IsgcrmLoginModule,
    IsgcrmCommonModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    NgbModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () => 
          import ('@nx/isgcrm/login').then(
            (module) => module.IsgcrmLoginModule
          ),
      },
      {
        path: 'products',
        loadChildren: () => 
          import ('@nx/isgcrm/products').then(
            (module) => module.IsgcrmProductsModule
          ),
      }      
    ])
    //RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
