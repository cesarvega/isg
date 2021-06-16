import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontierMainComponent } from './frontier-main/frontier-main.component';
import { AddressSearchComponent } from './address-search/address-search.component';
import { OffersComponent } from './offers/offers.component';
import { IsgSharedModule } from '../isg-shared/isg-shared.module';
import { FrontierRoutingModule } from './frontier-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TabsMenuComponent } from './tabs-menu/tabs-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreditCheckComponent } from './credit-check/credit-check.component';
import { AccountComponent } from './credit-check/account/account.component';
import { IdentityComponent } from './credit-check/identity/identity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CustomizationsComponent } from './customizations/customizations.component';
import { ChildEntityComponent } from './customizations/child-entity/child-entity.component';
import { AddressSelectorComponent } from './address-search/address-selector/address-selector.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ChildOptionComponent } from './customizations/child-entity/child-option/child-option.component';
import { ChildEntityConfigurationComponent } from './customizations/child-entity/child-entity-configuration/child-entity-configuration.component';
import { DisclosureComponent } from './disclosure/disclosure.component';
import { DisclosureItemComponent } from './disclosure/disclosure-item/disclosure-item.component';
import { ConfirmationComponent } from './confirmation/confirmation.component'
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    FrontierMainComponent,
    AddressSearchComponent,
    OffersComponent,
    ShoppingCartComponent,
    TabsMenuComponent,
    OfferDetailComponent,
    CreditCheckComponent,
    AccountComponent,
    IdentityComponent,
    CustomizationsComponent,
    ChildEntityComponent,
    AddressSelectorComponent,
    ChildOptionComponent,
    ChildEntityConfigurationComponent,
    DisclosureComponent,
    DisclosureItemComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    IsgSharedModule,
    FrontierRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgxMaskModule.forRoot()
  ]
})
export class FrontierModule { }
