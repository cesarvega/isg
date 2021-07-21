import { Component, OnInit } from '@angular/core';
import { SnapshotStore } from '../../utils/services/state.service';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { QuoteApiService } from '../../utils/services/api/quote-api.service';
import { removeAllCustomizations, setStepAction } from '../../utils/store/actions';
import { parseHttperror } from '../../utils/helper-functions';
import { ProductsApiService } from '../../utils/services/api/products-api.service';
import { Item } from '../../utils/store/interfaces/quote';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { getTaskByNameFromState } from '../../utils/store/complexSelectors/taks';
import { offerTaskIdName, numberPortabilityTaskName, quoteValidationTaskName } from '../../utils/taskNames';
import { ChildEntityHelperService } from './child-entity-helper.service';
import { Steps } from '../../utils/steps';
import { Router } from '@angular/router';
import { selectWasQuoteValidated, selectWereDisclosuresAccepted } from '../../utils/store/selectors';

@Component({
  selector: 'app-customizations',
  templateUrl: './customizations.component.html',
  styleUrls: ['./customizations.component.css']
})
export class CustomizationsComponent implements OnInit {

  quoteId: string
  loading: Boolean = false
  error: ErrorInterface
  items: Item[] = []
  selectOfferTask: TaskInterface
  numberPortabilityTask: TaskInterface
  wasQuoteValidated: boolean = false;
  wereDisclosuresAccepted: boolean = false;

  constructor(private snapShotStore: SnapshotStore, private quoteApiService: QuoteApiService, private productApiService: ProductsApiService,
    private tasksApiService: TasksApiService, public childEntityHelperService: ChildEntityHelperService, private router: Router) {
    this.quoteId = snapShotStore.getQuoteId();
    this.selectOfferTask = snapShotStore.select(getTaskByNameFromState(offerTaskIdName))
    this.numberPortabilityTask = snapShotStore.select(getTaskByNameFromState(numberPortabilityTaskName))
    this.wasQuoteValidated = snapShotStore.select(selectWasQuoteValidated);
    this.wereDisclosuresAccepted = snapShotStore.select(selectWereDisclosuresAccepted)
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



  async getQuote() {
    try {
      this.loading = true;
      let quote = await this.quoteApiService.getQuote(this.quoteId, true, true);
      this.items = quote.items;
    } catch (error) {
      this.error = parseHttperror(error);
    }
    this.loading = false;
  }

  areIteamsReadyToSubmit() {
    for (let item of this.items) {
      if (!item.completed)
        throw new Error("Need to complete required customizations");
    }
  }


  async submitCustomizations() {

    try {
      this.areIteamsReadyToSubmit()
      this.loading = true;

      // submit customizations
      for (let item of this.items) {
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
