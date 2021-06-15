import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuoteId, selectSelectedProducts } from '../store/selectors';
import { OffersInterface } from '../services/interfaces/products/offers-interface';
import { ProductsApiService } from '../services/api/products-api.service';
import { UserInterface } from '../services/interfaces/common/user-interface';
import { ProductsBuilder } from '../services/builders/products-builder';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { removeProductAction, setStepAction, setTasksAction, setQuoteAction, selectProductsAction } from '../store/actions';
import { Steps } from '../utils/steps';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksApiService } from '../services/api/tasks-api.service.';
import { TaskInterface } from '../store/interfaces/task-interface';
import { getValueFromState } from '../utils/get-value-from-state';
import { QuoteApiService } from '../services/api/quote-api.service';
import { getTaskByName } from '../store/complexSelectors/taks';
import { QuoteInterface } from '../store/interfaces/quote';
import { AlertInterface } from '../services/interfaces/common/alert-interface';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  quoteId: string;
  user: UserInterface;
  quoteSubscription$;
  loading: Boolean = false;
  offers: OffersInterface[] = [];
  error: ErrorInterface = null
  selectedProducts;
  offerTask
  addProducts: OffersInterface[] = [];
  removeProducts = [];
  alert: AlertInterface;
  faExclamationTriangle = faExclamationTriangle

  constructor(private store: Store<any>, private productsApiService: ProductsApiService, private productBuilder: ProductsBuilder, private router: Router,
    private route: ActivatedRoute, private taskService: TasksApiService, private quoteApiService: QuoteApiService) {
    this.quoteSubscription$ = this.store.select(selectQuoteId).subscribe((quoteId) => {
      this.quoteId = quoteId;
    });

  }

  ngOnInit(): void {
    let productsSubscriber = this.store.select(selectSelectedProducts).subscribe((products) => {
      this.selectedProducts = products
    })
    productsSubscriber.unsubscribe();
    this.getOffers()
  }

  async getOffers() {
    this.loading = true;
    try {
      this.offers = await this.productsApiService.getOffers(this.quoteId)
      this.offers = this.productBuilder.mapSelectedProducts(this.offers, this.selectedProducts);
    } catch (error) {
      this.error = error;
    }
    this.loading = false
  }


  ngOnDestroy() {
    this.quoteSubscription$.unsubscribe();
  }

  async selectProduct(product: OffersInterface) {
    product.selected = true;
    this.addProducts.push(product);
  }

  private gotProductsSelected(): boolean {
    let offersSelected = this.offers.filter((offer: OffersInterface) => {
      return offer.selected == true
    })
    return offersSelected.length > 0
  }

  async onContinue() {
    if (!this.gotProductsSelected()) {
      this.alert = {
        type: "danger",
        message: "Need to select at least one product"
      }
      window.scrollTo(0, 0);
      return;
    }

    this.loading = true;

    try {
      await this.sendRemoveProductsApi();
      await this.sendAddProductsApi();
      this.store.dispatch(setStepAction({ step: Steps.creditCheckStep }));
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

  async sendAddProductsApi() {
    if (this.addProducts.length < 1)
      return
    let request = this.productBuilder.buildAddProduct(this.addProducts);
    this.store.dispatch(selectProductsAction({ products: this.addProducts }));
    await this.productsApiService.addProduct(request, this.quoteId);
  }

  async sendRemoveProductsApi() {
    if (this.removeProducts.length < 1)
      return
    this.store.dispatch(removeProductAction({ productIds: this.removeProducts }));
    let quote: QuoteInterface = await this.getQuote();
    for (let removeProductId of this.removeProducts) {
      let itemId = this.productBuilder.getItemIdFromProductId(quote, removeProductId);
      await this.productsApiService.removeProduct(itemId, this.quoteId);
    }
  }

}
