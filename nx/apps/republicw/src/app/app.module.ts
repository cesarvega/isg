import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [
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
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
