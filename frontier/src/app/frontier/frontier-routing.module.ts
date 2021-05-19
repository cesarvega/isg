import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressSearchComponent } from './address-search/address-search.component';
import { OffersComponent } from './offers/offers.component';
import { FrontierMainComponent } from './frontier-main/frontier-main.component';

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