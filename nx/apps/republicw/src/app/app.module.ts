import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [
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
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
