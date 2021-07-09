import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountFormInterface } from '../../utils/services/interfaces/customer/credit-check-form';
import { OffersInterface } from '../../utils/services/interfaces/products/offers-interface';
import { selectParsedAddress } from '../../utils/store/complexSelectors/address-parsed-selector';
import { selectAccountForm, selectSelectedProducts } from '../../utils/store/selectors';

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

  constructor(private store: Store<any>) {
    this.accountForm$ = this.store.select(selectAccountForm);
    this.selectedAddress$ = this.store.select(selectParsedAddress);
    this.selectedProducts$ = this.store.select(selectSelectedProducts);
  }

  getMonthlyTotalPrice(selectedProducts: OffersInterface[]): number {
    let totalMonthly = 0;
    for (let product of selectedProducts) {
      totalMonthly += product.bestPriceTerm.discountedPrice;
    }
    return totalMonthly;
  }

  ngOnInit(): void {
  }

}
