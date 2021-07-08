import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { removeProductAction, selectProductsAction, setOffersAction } from '../../store/actions';
import { QuoteInterface } from '../../store/interfaces/quote';
import { selectSelectedProducts } from '../../store/selectors';
import { ProductsBuilder } from '../builders/products-builder';
import { getOffersURL, addProductURL, getUpdateProductURL } from '../endpoints/products';
import { AddProduct } from '../interfaces/products/add-product';
import { OffersInterface } from '../interfaces/products/offers-interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor(private clientService: ClientService, private productBuilder: ProductsBuilder, private store: Store<any>) {

  }

  async getOffers(quoteId) {
    let selectedProducts = this.getSelectedProducts();
    let endpoint = getOffersURL + "/" + quoteId;
    return this.clientService.getAll(endpoint).pipe(
      map((offers) => {
        if (offers.length < 1) {
          throw new Error("No offers found, please try a different address");
        }
        return this.productBuilder.mapSelectedProducts(offers, selectedProducts);
      }),
      tap((mappedOffers) => {
        this.store.dispatch(setOffersAction({ offers: mappedOffers }))
      })
    ).toPromise()
  }

  private getSelectedProducts() {
    let selectedProducts = [];
    this.store.select(selectSelectedProducts).subscribe((storeSelectedProducts) => {
      selectedProducts = storeSelectedProducts;
    }).unsubscribe()
    return selectedProducts;
  }

  async addProduct(products: OffersInterface[], quoteId: string) {
    let request = this.productBuilder.buildAddProduct(products);
    let endpoint = addProductURL + "/" + quoteId;
    return this.clientService.post(endpoint, request).pipe(
      tap(() => {
        products = products.map((product) => {
          product.addedApi = true;
          return product
        })
        this.store.dispatch(selectProductsAction({ products }));
      })
    ).toPromise();
  }
  removeProduct(product: OffersInterface, quote: QuoteInterface) {
    let endpoint = addProductURL + "/" + quote.quoteId;
    let itemId = this.productBuilder.getItemIdFromProductId(quote, product.id);
    return this.clientService.delete(endpoint, itemId).pipe(
      tap(() => {
        this.store.dispatch(removeProductAction({ id: product.id }));
      })
    ).toPromise();
  }

  async updateProduct(itemConfiguration, quoteId, quoteItemId) {
    let endpoint = getUpdateProductURL(quoteId, quoteItemId);
    return await this.clientService.put(endpoint, itemConfiguration).toPromise();
  }
}
