import { Component, OnInit } from '@angular/core';
import { selectOffers, selectQuote, selectQuoteId, selectSelectedProducts } from '../../utils/store/selectors';
import { OffersInterface } from '../../utils/services/interfaces/products/offers-interface';
import { ProductsApiService } from '../../utils/services/api/products-api.service';
import { UserInterface } from '../../utils/services/interfaces/common/user-interface';
import { ProductsBuilder } from '../../utils/services/builders/products-builder';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { removeProductAction, setStepAction, selectProductsAction, addProduct } from '../../utils/store/actions';
import { Steps } from '../../utils/steps';
import { Router } from '@angular/router';
import { QuoteApiService } from '../../utils/services/api/quote-api.service';
import { QuoteInterface } from '../../utils/store/interfaces/quote';
import { AlertInterface } from '../../utils/services/interfaces/common/alert-interface';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { SnapshotStore } from '../../utils/services/state.service';
import { Store } from '@ngrx/store';
import { getParsedAddress } from '../address-search/helpers/get-parsed-adress';
import { selectParsedAddress } from '../../utils/store/complexSelectors/address-parsed-selector';
import { Observable, Subscription } from 'rxjs';
import { broadbandServiceType, categories, Category } from './utils/categories';
import { filterProducts } from './utils/filter-products';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  categories: Category[] = categories;
  quoteId: string;
  quote: QuoteInterface;
  user: UserInterface;
  loading: Boolean = false;
  offers: OffersInterface[] = [];
  constOffers: OffersInterface[] = [];
  error: ErrorInterface = null
  offerTask
  removeProducts: OffersInterface[] = [];
  alert: AlertInterface;
  faExclamationTriangle = faExclamationTriangle;
  selectedParsedAdress$: Observable<string>;
  showReviewPage = false;
  addProducts: OffersInterface[];
  addProductsSubscription: Subscription;

  public getParsedAddress = getParsedAddress;

  constructor(private store: Store<any>, private snapShotStore: SnapshotStore, private productsApiService: ProductsApiService, private router: Router, private quoteApiService: QuoteApiService, private productBuilder: ProductsBuilder) {

  }

  ngOnInit(): void {
    this.selectedParsedAdress$ = this.store.select(selectParsedAddress);
    this.addProductsSubscription = this.store.select(selectSelectedProducts).subscribe((products) => {
      this.addProducts = products;
    });
    this.initComponent();
  }

  private existCategory( category ){
    for (let offer of this.offers) {
      if ( offer.serviceType === category.value ){
          return category;
      }
    }
    return false;
  }

  ngOnDestroy() {
    this.addProductsSubscription.unsubscribe();
  }

  async initComponent() {
    this.loading = true;
    try {
      this.quoteId = this.snapShotStore.getQuoteId();
      await this.getOffers();
      this.categories = this.categories.filter(category => this.existCategory( category ) );
      this.selectCategoriesOnInit();
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
    this.loading = false;

  }


  async getQuote(quoteId) {
    return await this.quoteApiService.getQuote(quoteId, true, true) as QuoteInterface;
  }

  private async getOffers() {
    let offers = this.getOffersFromStore();
    if (offers.length < 1)
      offers = await this.getOffersFromApi(this.quoteId)
    this.offers = offers;
    this.constOffers = offers;
  }

  private selectCategoriesOnInit() {
    for (let category of this.categories) {
      if (category.active) {
        this.onSelectCategory(category.value);
        return;
      }
    }
  }

  getOffersFromStore() {
    let offers;
    this.store.select(selectOffers).subscribe((stateOffers) => {
      offers = stateOffers
    }).unsubscribe()
    return offers;
  }

  async getOffersFromApi(quoteId): Promise<OffersInterface[]> {
    return await this.productsApiService.getOffers(quoteId) as OffersInterface[];
  }

  select(product: OffersInterface) {
    product.selected = true;
    this.store.dispatch(addProduct({ product }))
  }




  private gotProductsSelected(offers): void {
    let hasBroadBandProduct = false;
    let offersSelected = offers.filter((offer: OffersInterface) => {
      if (offer.selected && offer.serviceType === broadbandServiceType)
        hasBroadBandProduct = true;
      return offer.selected === true;
    });
    if (!offersSelected.length) {
      throw new Error('Need to select at least one product');
    }
    if (!hasBroadBandProduct) {
      throw new Error('Need to select an Internet Product');
    }
  }

  reviewOffers() {
    try {
      this.gotProductsSelected(this.constOffers)
    } catch (error) {
      this.error = error;
      return;
    }
    this.showReviewPage = true;
  }

  getSelectedOffersForReview() {
    return this.constOffers.filter((offer) => {
      return offer.selected;
    });
  }
  async onContinue() {
    this.loading = true;
    this.showReviewPage = false;
    try {
      this.gotProductsSelected(this.constOffers)
      if (this.removeProducts.length > 0) {
        let quote = await this.getQuote(this.quoteId);
        await this.sendRemoveProductsApi(this.removeProducts, quote);
      }
      if (this.addProducts.length > 0)
        await this.sendAddProductsApi(this.addProducts, this.quoteId);
      this.snapShotStore.dispatch(setStepAction({ step: Steps.creditCheckStep }))
      this.router.navigate([Steps.creditCheckStep.url]);
    } catch (error) {
      this.loading = false;
      this.error = error;
      window.scrollTo(0, 0);
    }
    this.loading = false;
  }

  async removeProduct(product: OffersInterface) {
    product.selected = false;
    this.addProducts = this.addProducts.filter((iterateProduct) => {
      return iterateProduct.id !== product.id;
    });
    this.store.dispatch(removeProductAction({ id: product.id }));
    if (product.addedApi) {
      this.removeProducts.push(product);
    }
  }


  async sendAddProductsApi(addProducts, quoteId) {
    await this.productsApiService.addProduct(addProducts, quoteId);
  }

  async sendRemoveProductsApi(removeProducts: OffersInterface[], quote: QuoteInterface) {
    for (let product of removeProducts) {
      await this.productsApiService.removeProduct(product, quote);
    }
  }

  onSelectCategory = (categoryName: string) => {
    this.offers = filterProducts(this.constOffers, categoryName);
  }
}
