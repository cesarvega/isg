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
import { offerTaskIdName, numberPortabilityTaskName } from '../utils/taskNames';
import { ChildEntityHelperService } from './child-entity-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisclosureComponent } from '../disclosure/disclosure.component';
import { Steps } from '../utils/steps';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private stateService: StateService, private quoteApiService: QuoteApiService, private productApiService: ProductsApiService,
    private tasksApiService: TasksApiService, public childEntityHelperService: ChildEntityHelperService,
    private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
    this.quoteId = stateService.getQuoteId();
    this.selectOfferTask = stateService.getValueFromSelector(getTaskByName(offerTaskIdName))
    this.numberPortabilityTask = stateService.getValueFromSelector(getTaskByName(numberPortabilityTaskName))
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
        await this.productApiService.updateProduct(item, this.quoteId, item.id)
      }

      // close select offer task
      await this.tasksApiService.closeTask(this.quoteId, this.selectOfferTask.taskId);

      // close number portability task
      await this.tasksApiService.closeTask(this.quoteId, this.numberPortabilityTask.taskId);

      // validate quote
      await this.quoteApiService.validateQuote(this.quoteId);

      // accept disclosures

      this.openDisclosures();


    } catch (error) {
      this.loading = false;
      this.error = error;
    }
    this.loading = false;
    this.redirectToConfirmation()

  }

  private redirectToConfirmation() {
    this.stateService.dispatchAction(setStepAction({ step: Steps.confirmationStep }))
    this.router.navigate(['../confirmation'], { relativeTo: this.route });
  }
}
