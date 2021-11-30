import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepublicInterceptor } from '@nx/republicw/services'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from '@nx/republicw/services';
import { ErrorDialogService } from '@nx/republicw/services';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    AppComponent
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    RouterModule.forRoot([
      { 
        path: '', 
        pathMatch: 'full', 
        redirectTo: 'register' 
      },
      {
        path: 'register',
        pathMatch: 'full',
        loadChildren: () =>
          import('@nx/republicw/register').then(
            (module) => module.RepublicwRegisterModule
          )
      },
      {
        path: 'new-order',
        pathMatch: 'full',
        loadChildren: () =>
        import('@nx/republicw/new-order').then(
          (module) => module.RepublicwNewOrderModule
        )
      },
      {
        path: 'token',
        pathMatch: 'full',
        loadChildren: () =>
        import('@nx/republicw/token').then(
          (module) => module.RepublicwTokenModule
        )
      }
    ]),
  ],
  providers: [
    ErrorDialogService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: RepublicInterceptor, 
      multi: true },
    { 
      provide: Window,
      useValue: window
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent],
})
export class AppModule {}
