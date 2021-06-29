import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressSearchComponent } from './pages/address-search/address-search.component';
import { OffersComponent } from './pages/offers/offers.component';
import { FrontierMainComponent } from './layout/frontier-main/frontier-main.component';
import { CreditCheckComponent } from './pages/credit-check/credit-check.component';
import { CustomizationsComponent } from './pages/customizations/customizations.component';
import { BillingComponent } from './pages/billing/billing.component';

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
        path: 'billing',
        component: BillingComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontierRoutingModule { }
