import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor() { }

  getDiscountedPrice(price: number, discount: number) {
    return (price - discount).toFixed(2)
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
