import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { setOffersAction } from '../../store/actions';
import { selectSelectedProducts } from '../../store/selectors';
import { ProductsBuilder } from '../builders/products-builder';
import { getOffersURL, addProductURL, getUpdateProductURL } from '../endpoints/products';
import { AddProduct } from '../interfaces/products/add-product';


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

  async addProduct(addProductRequest: AddProduct, quoteId: string) {
    let endpoint = addProductURL + "/" + quoteId;
    return await this.clientService.post(endpoint, addProductRequest).toPromise();
  }
  async removeProduct(productId: string, quoteId: string) {
    let endpoint = addProductURL + "/" + quoteId;
    return await this.clientService.delete(endpoint, productId).toPromise();
  }

  async updateProduct(itemConfiguration, quoteId, quoteItemId) {
    let endpoint = getUpdateProductURL(quoteId, quoteItemId);
    return await this.clientService.put(endpoint, itemConfiguration).toPromise();
  }
}
