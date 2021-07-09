import { Injectable } from '@angular/core';
import { AddProduct } from '../interfaces/products/add-product';
import { OffersInterface, PriceTerm } from '../interfaces/products/offers-interface';
import { Item, QuoteInterface } from '../../store/interfaces/quote';
import { OffersService } from '../helpers/offers.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsBuilder {

  constructor(private offersService: OffersService) { }

  buildAddProduct(products: OffersInterface[]): AddProduct {
    let productsRequest = [];
    for (let product of products) {
      productsRequest.push(
        {
          productId: product.id
        }
      )
    }
    let request: AddProduct = {
      products: productsRequest
    }
    return request
  }

  getItemIdFromProductId(quote: QuoteInterface, productId) {
    let quoteItem = quote.items.find((item: Item) => {
      return item.productId == productId
    })
    return quoteItem ? quoteItem.id : ""
  }

  mapSelectedProducts(products: OffersInterface[], selectedProducts) {
    return products.map((product: OffersInterface) => {
      product.pricePlan.priceTerm = product.pricePlan.priceTerm.map((priceTerm: PriceTerm) => {
        priceTerm.discountedPrice = this.offersService.getReducedPrice(priceTerm);
        return priceTerm;
      })
      product.bestPriceTerm = this.offersService.getBestPriceTerm(product);
      if (this.isProductSelected(product, selectedProducts))
        product.selected = true
      return product
    })
  }

  isProductSelected(product: OffersInterface, selectedProducts) {
    return selectedProducts.find((iterateProduct) => {
      return iterateProduct.id == product.id
    })

  }

}
