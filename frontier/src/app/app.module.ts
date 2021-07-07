import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FrontierModule } from './frontier/frontier.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { FrontierReducer } from './frontier/utils/store/reducer';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RootReducer } from './store/reducer';
import { storageSyncMetaReducer } from 'ngrx-store-persist';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorInterceptor } from './frontier/utils/interceptors/error.interceptor';
import { AuthenticationInterceptor } from './frontier/utils/interceptors/authentication.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PageNotFoundComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontierModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ frontier: FrontierReducer, root: RootReducer },
      {
        metaReducers: [storageSyncMetaReducer], runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
