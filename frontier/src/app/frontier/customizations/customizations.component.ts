import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ErrorInterface } from '../services/interfaces/common/error-interface';
import { QuoteApiService } from '../services/api/quote-api.service';
import { setQuoteAction, setStepAction } from '../store/actions';
import { parseHttperror } from '../utils/helper-functions';
import { ProductsApiService } from '../services/api/products-api.service';
import { Item, ChildEntity } from '../store/interfaces/quote';
import { TaskInterface } from '../store/interfaces/task-interface';
import { getValueFromState } from '../utils/get-value-from-state';
import { TasksApiService } from '../services/api/tasks-api.service.';
import { getTaskByName } from '../store/complexSelectors/taks';
import { offerTaskIdName, numberPortabilityTaskName, quoteValidationTaskName } from '../utils/taskNames';
import { ChildEntityHelperService } from './child-entity-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisclosureComponent } from '../disclosure/disclosure.component';
import { Steps } from '../utils/steps';
import { ActivatedRoute, Router } from '@angular/router';
import { selectWasQuoteValidated, selectWereDisclosuresAccepted } from '../store/selectors';

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

  constructor(private stateService: StateService, private quoteApiService: QuoteApiService, private productApiService: ProductsApiService,
    private tasksApiService: TasksApiService, public childEntityHelperService: ChildEntityHelperService, private router: Router, private modalService: NgbModal) {
    this.quoteId = stateService.getQuoteId();
    this.selectOfferTask = stateService.getValueFromSelector(getTaskByName(offerTaskIdName))
    this.numberPortabilityTask = stateService.getValueFromSelector(getTaskByName(numberPortabilityTaskName))
    this.wasQuoteValidated = stateService.getValueFromSelector(selectWasQuoteValidated);
    this.wereDisclosuresAccepted = stateService.getValueFromSelector(selectWereDisclosuresAccepted)
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

  ngOnInit(): void {
    this.getQuote()
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
        return false
    }
    return true
  }

  private openDisclosures() {
    const modalRef = this.modalService.open(DisclosureComponent);
    modalRef.componentInstance.onSubmitDisclosures.subscribe(() => {
      modalRef.close();
      this.onSubmitDisclosures()
    })
  }

  async submitCustomizations() {
    if (!this.areIteamsReadyToSubmit()) {
      this.error = {
        message: "items are not ready",
        errors: []
      }
      return
    }
    try {
      this.loading = true;

      // submit customizations
      for (let item of this.items) {
        delete item.completed;
        await this.productApiService.updateProduct(item, this.quoteId, item.id)
      }

      // close select offer task
      if (this.selectOfferTask && !this.stateService.isTaskClosed(offerTaskIdName))
        await this.tasksApiService.closeTask(this.quoteId, this.selectOfferTask);

      // close number portability task
      if (this.numberPortabilityTask && !this.stateService.isTaskClosed(numberPortabilityTaskName))
        await this.tasksApiService.closeTask(this.quoteId, this.numberPortabilityTask);

      // validate quote
      if (!this.wasQuoteValidated)
        await this.quoteApiService.validateQuote(this.quoteId);

      // close validate quote task
      let response = await this.tasksApiService.getTasks(this.quoteId);
      let tasks = response.currentTasks;
      let quoteValidationTask = tasks.find((iterateTask) => {
        return iterateTask.specName == quoteValidationTaskName
      })
      if (quoteValidationTask && !this.stateService.isTaskClosed(quoteValidationTaskName))
        await this.tasksApiService.closeTask(this.quoteId, quoteValidationTask)


      // accept disclosures
      this.loading = false;
      if (this.wereDisclosuresAccepted) {
        this.redirectToBilling();
      } else {
        this.openDisclosures();
      }

    } catch (error) {
      this.loading = false;
      this.error = error;
      return;
    }
  }

  async onSubmitDisclosures() {
    this.redirectToBilling()
  }

  private redirectToBilling() {
    this.stateService.dispatchAction(setStepAction({ step: Steps.billingStep }))
    this.router.navigate([Steps.billingStep.url]);
  }
}
