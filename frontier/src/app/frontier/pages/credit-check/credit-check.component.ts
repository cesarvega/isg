import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { CustomerApiService } from '../../utils/services/api/customer-api.service';
import { CustomerContactBuilder } from '../../utils/services/builders/customer/customer-contact-builder';
import { CreditFormInterface } from '../../utils/services/interfaces/customer/credit-check-form';
import { selectCustomerCreditCheckResult, selectQuoteId, selectSelectedAddress } from '../../utils/store/selectors';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { setStepAction } from '../../utils/store/actions';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from '../../utils/steps';
import { SnapshotStore } from '../../utils/services/state.service';
import { changeCustomerDetailsTaskName, creditCheckTaskName, customerDetailsTaskName } from '../../utils/taskNames';
import { creditCheckTestCases } from './test-cases';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { CreditCheckResultInterface } from '../../utils/services/interfaces/customer/credit-check-result';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OffersInterface } from '../../utils/services/interfaces/products/offers-interface';
import { getTasksByNameLocal } from '../../utils/store/complexSelectors/taks';

@Component({
  selector: 'app-credit-check',
  templateUrl: './credit-check.component.html',
  styleUrls: ['./credit-check.component.css']
})
export class CreditCheckComponent implements OnInit {

  faComment = faComment;
  showForm = false;
  quoteId;
  customerDetailTask: TaskInterface;
  address;
  loading: Boolean = false;
  error: ErrorInterface = null;
  selectedTestCase: string;
  creditCheckTestCases = creditCheckTestCases;
  @ViewChild('accordion') accordionComponent: NgbAccordion;
  creditCheckResult$: Observable<CreditCheckResultInterface>;
  displayChallengeQuestionsForm = false;
  selectedProducts: OffersInterface[] = [];
  alertMessage: string;
  creditFormValues: CreditFormInterface;

  constructor(private customerApiService: CustomerApiService, private customerContactBuilder: CustomerContactBuilder
    , private tasksApiService: TasksApiService, private route: ActivatedRoute, private router: Router, private snapShotStore: SnapshotStore, private store: Store<any>) {
  }

  displayCreditCheckResult(creditCheckResult) {
    return creditCheckResult ? true : false;

  }

  ngOnInit(): void {
    this.creditCheckResult$ = this.store.select(selectCustomerCreditCheckResult)
    this.quoteId = this.snapShotStore.select(selectQuoteId);
    this.address = this.snapShotStore.select(selectSelectedAddress)
    this.selectedProducts = this.snapShotStore.getFrontierState().selectedProducts;
  }

  async getTasks() {
    return await this.tasksApiService.getTasks();
  }

  private async determineNumberPortability(phoneNumber) {
    const voiceProducts = this.selectedProducts.filter((product) => {
      return product.serviceType === "Voice";
    });
    if (voiceProducts.length > 0) {
      this.loading = true;
      const response = await this.customerApiService.numberPortability(phoneNumber);
      this.loading = false;
      if (response.isPortable) {
        this.alertMessage = `Congratulations your Phone Number ${response.phoneNumber} is Portable`;
      }
    }
  }


  onSelectTestCase(selectedTestCase) {
    let testCase: CreditFormInterface = this.creditCheckTestCases.find((testCase) => {
      return testCase.alias === selectedTestCase
    })
    if (testCase) {
      this.creditFormValues = testCase;
    }
  }


  private async submitCreditCheckInformation(creditForm: CreditFormInterface) {
    this.loading = true;

    try {
      await this.customerApiService.updateCustomer(creditForm, this.address.address);
      const tasks = await this.getTasks();
      if (getTasksByNameLocal(tasks, customerDetailsTaskName)) {
        await this.tasksApiService.closeTask(customerDetailsTaskName);
      } else {
        await this.tasksApiService.closeTask(changeCustomerDetailsTaskName);
      }
      let creditCheckResponse = await this.customerApiService.creditCheck(null);
      if (creditCheckResponse.fraudPrevention && creditCheckResponse.fraudPrevention.length > 0) {
        return;
      }
      await this.getTasks();
      await this.tasksApiService.closeTask(creditCheckTaskName);
    }
    catch (error) {
      this.error = error;
      window.scrollTo(0, 0);
    }
    this.loading = false;

  }

  displayCreditResult(creditCheckResult: CreditCheckResultInterface): boolean {
    if (!creditCheckResult)
      return false
    return !this.displayQuestionsForm(creditCheckResult);
  }

  public displayQuestionsForm(creditCheckResult: CreditCheckResultInterface) {
    if (!creditCheckResult)
      return false;
    const fraudPrevention: any = creditCheckResult.fraudPrevention;
    return fraudPrevention && fraudPrevention.length > 0
  }

  public async submitChallengeQuestions(request) {

  }

  navigateToCustomization() {
    this.snapShotStore.dispatch(setStepAction({ step: Steps.customizationStep }))
    this.router.navigate([Steps.customizationStep.url]);

  }

}
