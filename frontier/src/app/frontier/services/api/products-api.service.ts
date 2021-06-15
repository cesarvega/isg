import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientService } from 'src/app/isg-shared/client/client.service';
import { getOffersURL, addProductURL, getUpdateProductURL } from '../endpoints/products';
import { AddProduct } from '../interfaces/products/add-product';


@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor(private store: Store<any>, private clientService: ClientService) {

  }

  async getOffers(quoteId) {
    let endpoint = getOffersURL + "/" + quoteId;
    return await this.clientService.getAll(endpoint).toPromise();
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
