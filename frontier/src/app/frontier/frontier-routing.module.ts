import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressSearchComponent } from './pages/address-search/address-search.component';
import { OffersComponent } from './pages/offers/offers.component';
import { FrontierMainComponent } from './layout/frontier-main/frontier-main.component';
import { CreditCheckComponent } from './pages/credit-check/credit-check.component';
import { CustomizationsComponent } from './pages/customizations/customizations.component';
import { BillingComponent } from './pages/billing/billing.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { DisclosureComponent } from './pages/disclosure/disclosure.component';
import { RecapComponent } from './pages/recap/recap.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

const routes: Routes = [
  {
    path: '',
    component: FrontierMainComponent,
    children: [
      {
        path: 'addressSearch',
        component: AddressSearchComponent
      },
      {
        path: 'offers',
        component: OffersComponent
      },
      {
        path: 'credit-check',
        component: CreditCheckComponent
      },
      {
        path: 'customizations',
        component: CustomizationsComponent
      },
      {
        path: 'disclosures',
        component: DisclosureComponent
      },
      {
        path: 'billing',
        component: BillingComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'recap',
        component: RecapComponent
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent
      }, { path: '', redirectTo: 'addressSearch', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontierRoutingModule { }
