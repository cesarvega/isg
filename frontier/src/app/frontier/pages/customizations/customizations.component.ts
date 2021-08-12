import { Component, OnInit } from '@angular/core';
import { SnapshotStore } from '../../utils/services/state.service';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { QuoteApiService } from '../../utils/services/api/quote-api.service';
import { removeAllCustomizations, setStepAction } from '../../utils/store/actions';
import { parseHttperror } from '../../utils/helper-functions';
import { ProductsApiService } from '../../utils/services/api/products-api.service';
import { ChildEntity, Item, QuoteInterface } from '../../utils/store/interfaces/quote';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { getTaskByNameFromState } from '../../utils/store/complexSelectors/taks';
import { numberPortabilityTaskName, offerTaskIdName, quoteValidationTaskName } from '../../utils/taskNames';
import { ChildEntityHelperService } from './child-entity-helper.service';
import { Steps } from '../../utils/steps';
import { Router } from '@angular/router';
import { selectQuote, selectQuoteItems, selectSelectedCustomizations, selectWasQuoteValidated, selectWereDisclosuresAccepted } from '../../utils/store/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getValueFromObservable } from '../../utils/get-value-from-state';
import { selectMonthlyCustomizations, selectOneTimeCustomizations } from '../../utils/store/complexSelectors/customization-selectors';

@Component({
  selector: 'app-customizations',
  templateUrl: './customizations.component.html',
  styleUrls: ['./customizations.component.css']
})
export class CustomizationsComponent implements OnInit {

  quoteId: string
  loading: Boolean = false
  error: ErrorInterface
  selectOfferTask: TaskInterface
  wasQuoteValidated: boolean = false;
  wereDisclosuresAccepted: boolean = false;
  activeItem: Item = null;
  showResults = false;
  items: Observable<Item[]>;
  monthlyCustomizations: Observable<ChildEntity[]>;
  oneTimeCustomizations: Observable<ChildEntity[]>;

  constructor(private snapShotStore: SnapshotStore, private quoteApiService: QuoteApiService, private productApiService: ProductsApiService,
    private tasksApiService: TasksApiService, public childEntityHelperService: ChildEntityHelperService, private router: Router, private store: Store<any>) {
    this.quoteId = snapShotStore.getQuoteId();
    this.selectOfferTask = snapShotStore.select(getTaskByNameFromState(offerTaskIdName))
    this.wasQuoteValidated = snapShotStore.select(selectWasQuoteValidated);
    this.wereDisclosuresAccepted = snapShotStore.select(selectWereDisclosuresAccepted)
    this.items = this.store.select(selectQuoteItems);
    this.monthlyCustomizations = this.store.select(selectMonthlyCustomizations);
    this.oneTimeCustomizations = this.store.select(selectOneTimeCustomizations);
  }

  ngOnInit(): void {
    this.snapShotStore.dispatch(removeAllCustomizations(null));
    this.getQuote()
  }

  isItemConfigurationCompleted(item: Item) {
    for (let childEntity of item.productConfiguration.ChildEntity) {
      if (!this.childEntityHelperService.isCustomizationCompleteFunctional(childEntity)) {
        item.completed = false;
        return item.completed
      }

    }
    item.completed = true;
    return item.completed
  }

  showSubmitButton(items) {
    if (items.length < 1)
      return false
    const length = items.length;
    const lastElement = items[length - 1];
    return this.activeItem.id === lastElement.id && this.isItemConfigurationCompleted(lastElement)
  }



  async getQuote() {
    try {
      this.loading = true;
      const quote = await this.quoteApiService.getQuote(this.quoteId, true, true);
      this.activeItem = quote.items[0];
    } catch (error) {
      this.error = parseHttperror(error);
    }
    this.loading = false;
  }

  continueCustomization() {
    const items = getValueFromObservable(this.items);
    if (this.isItemConfigurationCompleted(this.activeItem)) {
      const currentIndex = items.findIndex((iterateItem) => {
        return iterateItem.id === this.activeItem.id
      })
      if (currentIndex < items.length - 1) {
        this.activeItem = items[currentIndex + 1];
      }
    }
    else {
      this.error = { message: "Need to select all required fields", errors: [] };
      window.scroll(0, 0);
    }
  }




  async submitCustomizations() {

    try {
      let items = getValueFromObservable(this.items);
      this.loading = true;

      // submit customizations
      for (let item of items) {
        delete item.completed;
        await this.productApiService.updateProduct(item, this.quoteId, item.id)
      }

      // close select offer task
      await this.tasksApiService.closeTask(offerTaskIdName);
      // close number portability task
      await this.tasksApiService.closeTask(numberPortabilityTaskName);

      // validate quote
      if (!this.wasQuoteValidated)
        await this.quoteApiService.validateQuote(this.quoteId);

      // close validate quote task
      await this.tasksApiService.getTasks();

      // close validation quote class
      await this.tasksApiService.closeTask(quoteValidationTaskName)

      // accept disclosures
      this.loading = false;
      this.redirectToDisclosures();

    } catch (error) {
      this.loading = false;
      this.error = error;
      return;
    }
  }


  private redirectToDisclosures() {
    this.snapShotStore.dispatch(setStepAction({ step: Steps.disclosuresStep }))
    this.router.navigate([Steps.disclosuresStep.url]);
  }
}
