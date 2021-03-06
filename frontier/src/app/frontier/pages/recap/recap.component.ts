import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuoteApiService } from '../../utils/services/api/quote-api.service';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { CreditFormInterface } from '../../utils/services/interfaces/customer/credit-check-form';
import { Steps } from '../../utils/steps';
import { setStepAction } from '../../utils/store/actions';
import { selectParsedAddress } from '../../utils/store/complexSelectors/address-parsed-selector';
import { selectCreditForm } from '../../utils/store/selectors';
import { acceptQuoteTaskName, billPreviewTaskName } from '../../utils/taskNames';
import { BillingApiService } from '../confirmation/services/billing-api.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  error: ErrorInterface;
  loading = false;
  billPreviewHtml;
  creditForm$: Observable<CreditFormInterface>;
  selectedParsedAddress$: Observable<string>

  constructor(private billingApiService: BillingApiService, private sanitizer: DomSanitizer,
    private taskApiService: TasksApiService, private quoteApiService: QuoteApiService
    , private store: Store<any>, private router: Router) {
    this.creditForm$ = this.store.select(selectCreditForm);
    this.selectedParsedAddress$ = this.store.select(selectParsedAddress);
  }

  ngOnInit(): void {
    this.initComponent();
  }

  async initComponent() {
    let response = await this.makeRequest(this.getBillPreview.bind(this));
    this.billPreviewHtml = this.sanitizer.bypassSecurityTrustHtml(response);
  }

  async placeOrder() {
    this.loading = true;
    try {
      await this.taskApiService.getTasks();
      await this.taskApiService.closeTask(billPreviewTaskName)
      await this.taskApiService.getTasks();
      await this.taskApiService.closeTask(acceptQuoteTaskName);
      await this.quoteApiService.submitQuote();
      this.store.dispatch(setStepAction({ step: Steps.confirmationStep }))
      this.router.navigate([Steps.confirmationStep.url]);
    } catch (error) {
      this.loading = false;
      this.error = error;
      return;
    } finally {
      this.loading = false;
    }
  }

  private getBillPreview() {
    return this.billingApiService.getBillPreview();
  }

  private async makeRequest(request) {
    this.beforeRequest();
    try {
      return await request();
    } catch (error) {
      this.handleError(error);
      throw new Error(error)
    } finally {
      this.afterRequest();
    }
  }

  private beforeRequest() {
    this.loading = true;
  }

  private afterRequest() {
    this.loading = false;
  }

  private handleError(error) {
    this.error = error;
  }

}
