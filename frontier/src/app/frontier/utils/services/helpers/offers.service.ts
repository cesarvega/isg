import { Injectable } from '@angular/core';
import { Discount, PriceTerm } from '../interfaces/products/offers-interface';

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

  getDiscountedPrice(price: number, discount: number) {
    return (price - discount).toFixed(2)
  }

  getReducedPrice(priceTerm: PriceTerm) {
    let discount = this.getBestDiscount(priceTerm);
    if (discount)
      return (parseFloat(priceTerm.amount) + parseFloat(discount.amount)).toFixed(2)
    return priceTerm.amount;
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

  getPriceWithoutCents(price: number) {
    let convertedPrice = price.toString();
    let splittedPrice = convertedPrice.split(".")
    if (splittedPrice)
      return splittedPrice[0]
    return price
  }

  getCentsFromPrice(price: number) {
    let convertedPrice = price.toString();
    let splittedPrice = convertedPrice.split(".")
    if (splittedPrice) {
      let cents = splittedPrice[1];
      return cents ?? "00";
    }
    return ""
  }
}
