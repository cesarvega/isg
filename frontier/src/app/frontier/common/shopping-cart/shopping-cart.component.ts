import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DepositResponse } from '../../pages/billing/payment/interfaces/deposit-requirements-response.interface';
import { getTotalPayment } from '../../pages/billing/payment/services/deposit-request-builder.service';
import { AccountFormInterface } from '../../utils/services/interfaces/customer/credit-check-form';
import { OffersInterface } from '../../utils/services/interfaces/products/offers-interface';
import { selectParsedAddress } from '../../utils/store/complexSelectors/address-parsed-selector';
import { selectMonthlyCustomizations, selectOneTimeCustomizations } from '../../utils/store/complexSelectors/customization-selectors';
import { ChildEntity } from '../../utils/store/interfaces/quote';
import { selectAccountForm, selectDepositRequirements, selectSelectedCustomizations, selectSelectedProducts } from '../../utils/store/selectors';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  faBars = faBars;
  accountForm$: Observable<AccountFormInterface>;
  selectedAddress$: Observable<string>;
  selectedProducts$: Observable<OffersInterface[]>;
  depositResponse$: Observable<DepositResponse>;
  oneTimeCustomizations$: Observable<ChildEntity[]>;
  monthlyCustomizations$: Observable<ChildEntity[]>;


  constructor(private store: Store<any>) {
    this.accountForm$ = this.store.select(selectAccountForm);
    this.selectedAddress$ = this.store.select(selectParsedAddress);
    this.selectedProducts$ = this.store.select(selectSelectedProducts);
    this.depositResponse$ = this.store.select(selectDepositRequirements);
    this.oneTimeCustomizations$ = this.store.select(selectOneTimeCustomizations);
    this.monthlyCustomizations$ = this.store.select(selectMonthlyCustomizations);
  }

  getMonthlyTotalPrice(selectedProducts: OffersInterface[], monthlyCustomizations: ChildEntity[]): number {
    let totalMonthly = 0;
    for (let product of selectedProducts) {
      totalMonthly += product.bestPriceTerm.discountedPrice;
    }
    for (let customization of monthlyCustomizations) {
      for (let price of customization.Price) {
        totalMonthly += parseFloat(price.rateRecurring);
      }
    }
    return totalMonthly;
  }

  getOneTimeTotalPrice(selectedProducts: OffersInterface[], oneTimeCustomizations: ChildEntity[]) {
    let sum = 0;
    for (let customization of oneTimeCustomizations) {
      for (let price of customization.Price) {
        sum += parseFloat(price.rateNonRecurring);
      }
    }
    return sum;

  }

  getOneTimePrice(): number {
    return 0;
  }

  getDueToday(depositResponse: DepositResponse): number {
    if (!depositResponse)
      return 0
    return getTotalPayment(depositResponse);
  }

  ngOnInit(): void {
  }

}
