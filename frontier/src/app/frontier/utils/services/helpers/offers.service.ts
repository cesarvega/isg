import { Injectable } from '@angular/core';
import { Discount, OffersInterface, PriceTerm } from '../interfaces/products/offers-interface';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor() { }

  priceTermHasDiscount(priceTerm: PriceTerm) {
    if (!priceTerm.discount)
      return false
    let discount = priceTerm.discount[0];
    return discount.amount;
  }

  getBestPriceTerm(product: OffersInterface) {
    let bestPriceTerm: PriceTerm = product.pricePlan.priceTerm.reduce((previous: PriceTerm, current: PriceTerm) => {
      if (!previous)
        return current;
      return previous.discountedPrice >= current.discountedPrice ? previous : current;
    }, null);
    return bestPriceTerm;
  }



  getReducedPrice(priceTerm: PriceTerm): number {
    if (priceTerm.discount.length > 0) {
      let discount = this.getBestDiscount(priceTerm);
      let discountedPrice = parseFloat(priceTerm.amount) + parseFloat(discount.amount);
      if (isNaN(discountedPrice))
        return parseFloat(priceTerm.amount);
      return Math.round(discountedPrice * 100) / 100;
    }
    return parseFloat(priceTerm.amount);
  }

  getBestDiscount(priceTerm: PriceTerm): Discount {
    return priceTerm.discount.reduce(function (acumulator: Discount, currentValue: Discount) {
      if (!acumulator)
        return currentValue
      if (acumulator.amount > currentValue.amount)
        return acumulator;
      return currentValue;
    }, null)

  }

}
