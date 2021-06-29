import { Component, OnInit } from '@angular/core';
import { selectOffers, selectQuote, selectQuoteId } from '../../utils/store/selectors';
import { OffersInterface } from '../../utils/services/interfaces/products/offers-interface';
import { ProductsApiService } from '../../utils/services/api/products-api.service';
import { UserInterface } from '../../utils/services/interfaces/common/user-interface';
import { ProductsBuilder } from '../../utils/services/builders/products-builder';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { removeProductAction, setStepAction, selectProductsAction } from '../../utils/store/actions';
import { Steps } from '../../utils/steps';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteApiService } from '../../utils/services/api/quote-api.service';
import { QuoteInterface } from '../../utils/store/interfaces/quote';
import { AlertInterface } from '../../utils/services/interfaces/common/alert-interface';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { StateService } from '../../utils/services/state.service';
import { Store } from '@ngrx/store';
import { getParsedAddress } from '../address-search/helpers/get-parsed-adress';
import { selectParsedAddress } from '../../utils/store/complexSelectors/address-parsed-selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  quoteId: string;
  quote: QuoteInterface;
  user: UserInterface;
  loading: Boolean = false;
  offers: OffersInterface[] = [];
  error: ErrorInterface = null
  offerTask
  addProducts: OffersInterface[] = [];
  removeProducts: OffersInterface[] = [];
  alert: AlertInterface;
  faExclamationTriangle = faExclamationTriangle;
  selectedParsedAdress$: Observable<string>;

  public getParsedAddress = getParsedAddress;

  constructor(private store: Store<any>, private stateService: StateService, private productsApiService: ProductsApiService, private router: Router, private quoteApiService: QuoteApiService, private productBuilder: ProductsBuilder) {

  }

  ngOnInit(): void {
    this.selectedParsedAdress$ = this.store.select(selectParsedAddress);
    this.initComponent();

  }

  async initComponent() {
    this.loading = true;
    try {
      this.quoteId = this.stateService.getQuoteId();
      this.offers = this.getOffersFromStore();
      if (this.offers.length < 1)
        this.offers = await this.getOffers(this.quoteId)
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
    this.loading = false;

  }


  async getQuote(quoteId) {
    return await this.quoteApiService.getQuote(quoteId, true, true) as QuoteInterface;
  }


  getOffersFromStore() {
    let offers;
    this.store.select(selectOffers).subscribe((stateOffers) => {
      offers = stateOffers
    }).unsubscribe()
    return offers;
  }

  async getOffers(quoteId): Promise<OffersInterface[]> {
    return await this.productsApiService.getOffers(quoteId) as OffersInterface[];
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

    this.loading = true;
    try {
      if (!this.gotProductsSelected(this.offers)) {
        throw new Error("Need to select at least one product")
      }
      if (this.removeProducts.length > 0) {
        let quote = await this.getQuote(this.quoteId);
        await this.sendRemoveProductsApi(this.removeProducts, quote);
      }
      if (this.addProducts.length > 0)
        await this.sendAddProductsApi(this.addProducts, this.quoteId);
      this.stateService.dispatchAction(setStepAction({ step: Steps.creditCheckStep }))
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
      return iterateProduct.id != product.id
    })
    if (product.addedApi)
      this.removeProducts.push(product)
  }

  async sendAddProductsApi(addProducts, quoteId) {
    await this.productsApiService.addProduct(addProducts, quoteId);
  }

  async sendRemoveProductsApi(removeProducts: OffersInterface[], quote: QuoteInterface) {
    for (let product of removeProducts) {
      await this.productsApiService.removeProduct(product, quote);
    }
  }

}
