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



@NgModule({
  declarations: [
    FrontierMainComponent,
    AddressSearchComponent,
    OffersComponent,
    ShoppingCartComponent,
    TabsMenuComponent,
    OfferDetailComponent

  ],
  imports: [
    CommonModule,
    IsgSharedModule,
    FrontierRoutingModule,
    NgbModule,
    FontAwesomeModule
  ]
})
export class FrontierModule { }
