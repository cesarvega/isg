import { Component, OnInit } from '@angular/core';
import { selectQuoteId, selectSelectedProducts } from '../store/selectors';
import { OffersInterface } from '../services/interfaces/products/offers-interface';
import { ProductsApiService } from '../services/api/products-api.service';
import { UserInterface } from '../services/interfaces/common/user-interface';
import { ProductsBuilder } from '../services/builders/products-builder';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { removeProductAction, setStepAction, selectProductsAction } from '../store/actions';
import { Steps } from '../utils/steps';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteApiService } from '../services/api/quote-api.service';
import { QuoteInterface } from '../store/interfaces/quote';
import { AlertInterface } from '../services/interfaces/common/alert-interface';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { StateService } from '../services/state.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  quoteId: string;
  selectedProducts = [];
  user: UserInterface;
  loading: Boolean = false;
  offers: OffersInterface[] = [];
  error: ErrorInterface = null
  offerTask
  addProducts: OffersInterface[] = [];
  removeProducts = [];
  alert: AlertInterface;
  faExclamationTriangle = faExclamationTriangle

  constructor(private store: Store<any>, private stateService: StateService, private productsApiService: ProductsApiService, private router: Router,
    private route: ActivatedRoute, private quoteApiService: QuoteApiService, private productBuilder: ProductsBuilder) {

  }

  ngOnInit(): void {
    this.getQuoteId();
    this.getSelectedProducts();
    this.getOffers()
  }

  getQuoteId() {
    this.store.select(selectQuoteId).subscribe((quoteId) => {
      this.quoteId = quoteId;
    }).unsubscribe()
  }

  async getSelectedProducts() {
    this.store.select(selectSelectedProducts).subscribe((selectedProducts) => {
      this.selectedProducts = selectedProducts;
    }).unsubscribe()
  }



  async getOffers() {
    this.loading = true;
    try {
      this.offers = await this.productsApiService.getOffers(this.quoteId);
    } catch (error) {
      this.error = error;
    }
    this.loading = false
  }

  select(product: OffersInterface) {
    product.selected = true;
    this.addProducts.push(product);
  }




  private gotProductsSelected(offers): boolean {
    let offersSelected = offers.filter((offer: OffersInterface) => {
      return offer.selected == true
    })
    return offersSelected.length > 0
  }

  async onContinue() {
    if (!this.gotProductsSelected(this.offers)) {
      this.alert = {
        type: "danger",
        message: "Need to select at least one product"
      }
      window.scrollTo(0, 0);
      return;
    }

    this.loading = true;

    try {
      await this.sendRemoveProductsApi(this.removeProducts, this.quoteId);
      await this.sendAddProductsApi(this.addProducts, this.quoteId, this.productBuilder);
      this.stateService.dispatchAction(setStepAction({ step: Steps.creditCheckStep }))
      this.router.navigate(['../credit-check'], { relativeTo: this.route });
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
    this.loading = false;
  }

  async getQuote() {
    return await this.quoteApiService.getQuote(this.quoteId, true, true);
  }

  async removeProduct(product: OffersInterface) {
    product.selected = false;
    this.addProducts = this.addProducts.filter((iterateProduct) => {
      return iterateProduct.id != product.id
    })
    this.removeProducts.push(product.id)
  }

  async sendAddProductsApi(addProducts, quoteId, productBuilder) {
    if (addProducts.length < 1)
      return
    let request = productBuilder.buildAddProduct(addProducts);
    this.stateService.dispatchAction(selectProductsAction({ products: addProducts }));
    await this.productsApiService.addProduct(request, quoteId);
  }

  async sendRemoveProductsApi(removeProducts, quoteId) {
    if (removeProducts.length < 1)
      return
    this.stateService.dispatchAction(removeProductAction({ productIds: removeProducts }));
    let quote: QuoteInterface = await this.getQuote();
    for (let removeProductId of removeProducts) {
      let itemId = this.productBuilder.getItemIdFromProductId(quote, removeProductId);
      await this.productsApiService.removeProduct(itemId, quoteId);
    }
  }

}
