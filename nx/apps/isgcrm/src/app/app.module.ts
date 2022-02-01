import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { IsgcrmCommonModule } from '@nx/isgcrm/common';
import { IsgcrmLoginModule } from '@nx/isgcrm/login';
import { IsgcrmInterceptor } from '@nx/isgcrm/shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    RouterModule.forRoot([
      {
        path: 'login',
        loadChildren: () =>
          import('@nx/isgcrm/login').then((module) => module.IsgcrmLoginModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
      }
    ]),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    IsgcrmLoginModule,
    IsgcrmCommonModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    NgbModule,
    BrowserModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IsgcrmInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
