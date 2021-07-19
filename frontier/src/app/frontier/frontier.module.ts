import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontierMainComponent } from './layout/frontier-main/frontier-main.component';
import { AddressSearchComponent } from './pages/address-search/address-search.component';
import { OffersComponent } from './pages/offers/offers.component';
import { IsgSharedModule } from '../isg-shared/isg-shared.module';
import { FrontierRoutingModule } from './frontier-routing.module';
import { ShoppingCartComponent } from './common/shopping-cart/shopping-cart.component';
import { TabsMenuComponent } from './layout/tabs-menu/tabs-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfferDetailComponent } from './pages/offers/offer-detail/offer-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreditCheckComponent } from './pages/credit-check/credit-check.component';
import { AccountComponent } from './pages/credit-check/account/account.component';
import { IdentityComponent } from './pages/credit-check/identity/identity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CustomizationsComponent } from './pages/customizations/customizations.component';
import { ChildEntityComponent } from './pages/customizations/child-entity/child-entity.component';
import { AddressSelectorComponent } from './pages/address-search/address-selector/address-selector.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ChildOptionComponent } from './pages/customizations/child-entity/child-option/child-option.component';
import { ChildEntityConfigurationComponent } from './pages/customizations/child-entity/child-entity-configuration/child-entity-configuration.component';
import { DisclosureComponent } from './pages/disclosure/disclosure.component';
import { DisclosureItemComponent } from './pages/disclosure/disclosure-item/disclosure-item.component';
import { BillingComponent } from './pages/billing/billing.component'
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PaymentComponent } from './pages/billing/payment/payment.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { CategoriesComponent } from './pages/offers/categories/categories.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CreditResultComponent } from './pages/credit-check/credit-result/credit-result.component';
import { RecapComponent } from './pages/recap/recap.component';
import { CustomerInformationComponent } from './pages/recap/customer-information/customer-information.component';
import { ContinueButtonComponent } from './common/continue-button/continue-button.component';
import { ChallengeQuestionsComponent } from './pages/credit-check/challenge-questions/challenge-questions.component';
import { NoPaymentComponent } from './pages/billing/no-payment/no-payment.component';
import { OfferSummaryComponent } from './pages/offers/offer-summary/offer-summary.component';
import { BillingAddressComponent } from './pages/credit-check/account/billing-address/billing-address.component';
import { TestCaseSelectorComponent } from './common/test-case-selector/test-case-selector.component';

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
    BillingComponent,
    PaymentComponent,
    ScheduleComponent,
    ConfirmationComponent,
    CategoriesComponent,
    CreditResultComponent,
    RecapComponent,
    CustomerInformationComponent,
    ContinueButtonComponent,
    ChallengeQuestionsComponent,
    NoPaymentComponent,
    OfferSummaryComponent,
    BillingAddressComponent,
    TestCaseSelectorComponent,
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
    NgxMaskModule.forRoot(),
    PdfViewerModule,
  ]
})

export class FrontierModule { }


