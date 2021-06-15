import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressSearchComponent } from './address-search/address-search.component';
import { OffersComponent } from './offers/offers.component';
import { FrontierMainComponent } from './frontier-main/frontier-main.component';
import { CreditCheckComponent } from './credit-check/credit-check.component';
import { CustomizationsComponent } from './customizations/customizations.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

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
        path: 'confirmation',
        component: ConfirmationComponent
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
