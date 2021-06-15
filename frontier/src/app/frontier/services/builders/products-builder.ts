import { Injectable } from '@angular/core';
import { AddProduct } from '../interfaces/products/add-product';
import { OffersInterface } from '../interfaces/products/offers-interface';
import { Item, QuoteInterface } from '../../store/interfaces/quote';

@Injectable({
  providedIn: 'root'
})
export class ProductsBuilder {

  constructor() { }

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
    if (selectedProducts.length == 0)
      return products;
    return products.map((product: OffersInterface) => {
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
