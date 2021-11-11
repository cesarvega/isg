import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IsgcrmCommonModule } from '@nx/isgcrm/common';
import { IsgcrmLoginModule } from '@nx/isgcrm/login';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        loadChildren: () => 
          import ('@nx/isgcrm/login').then(
            (module) => module.IsgcrmLoginModule
          ),
      },
      {
        path: '',
        loadChildren: () => import('./main/main.module')
          .then(m => m.MainModule),
      },
    ]),
    BrowserAnimationsModule,
    IsgcrmLoginModule,
    IsgcrmCommonModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    NgbModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
