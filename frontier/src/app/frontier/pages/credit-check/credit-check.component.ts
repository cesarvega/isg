import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { CustomerApiService } from '../../utils/services/api/customer-api.service';
import { CustomerContactBuilder } from '../../utils/services/builders/customer/customer-contact-builder';
import { IdentityFormInterface, AccountFormInterface, creditCheckInterface } from '../../utils/services/interfaces/customer/credit-check-form';
import { selectCustomerCreditCheckResult, selectQuoteId, selectSelectedAddress } from '../../utils/store/selectors';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { setStepAction } from '../../utils/store/actions';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from '../../utils/steps';
import { SnapshotStore } from '../../utils/services/state.service';
import { creditCheckTaskName, customerDetailsTaskName } from '../../utils/taskNames';
import { creditCheckTestCases } from './test-cases';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { CreditCheckResultInterface } from '../../utils/services/interfaces/customer/credit-check-result';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  accountFormValues: any = null;
  identityFormValues: any = null;
  loading: Boolean = false;
  error: ErrorInterface = null;
  selectedTestCase: string;
  creditCheckTestCases = creditCheckTestCases;
  @ViewChild('accordion') accordionComponent: NgbAccordion;
  creditCheckResult$: Observable<CreditCheckResultInterface>;

  constructor(private customerApiService: CustomerApiService, private customerContactBuilder: CustomerContactBuilder
    , private tasksApiService: TasksApiService, private route: ActivatedRoute, private router: Router, private stateService: SnapshotStore, private store: Store<any>) {
  }

  displayCreditCheckResult(creditCheckResult) {
    return creditCheckResult ? true : false;

  }

  ngOnInit(): void {
    this.creditCheckResult$ = this.store.select(selectCustomerCreditCheckResult)
    this.quoteId = this.stateService.select(selectQuoteId);
    this.address = this.stateService.select(selectSelectedAddress)
    this.accountFormValues = this.stateService.getFrontierState().accountForm;
    this.identityFormValues = this.stateService.getFrontierState().identityForm;
  }

  ngAfterViewInit() {
    if (this.identityFormValues && this.accordionComponent) {
      this.accordionComponent.toggle("verify-identity-panel");
    }
  }
  async getTasks() {
    return await this.tasksApiService.getTasks();
  }


  submitAccountForm(accountForm) {
    this.accountFormValues = accountForm;
    this.accordionComponent.toggle("create-account-panel");
    if (this.accordionComponent.activeIds.length == 0) {
      this.accordionComponent.toggle("verify-identity-panel");
    }
  }

  submitIdentityForm(identityForm) {
    this.identityFormValues = identityForm;
    this.submitCreditCheckInformation(identityForm, this.accountFormValues)
  }

  onSelectTestCase() {
    let testCase: creditCheckInterface = this.creditCheckTestCases.find((testCase) => {
      return testCase.alias === this.selectedTestCase
    })
    if (testCase) {
      this.accountFormValues = testCase.accountForm;
      this.identityFormValues = testCase.identityForm;
    }
  }

  private async submitCreditCheckInformation(identityForm: IdentityFormInterface, accountForm: AccountFormInterface) {
    this.loading = true;

    try {
      await this.customerApiService.updateCustomer(identityForm, accountForm, this.address.address);
      await this.getTasks();
      await this.tasksApiService.closeTask(customerDetailsTaskName);
      await this.customerApiService.creditCheck();
      await this.getTasks();
      await this.tasksApiService.closeTask(creditCheckTaskName);
    }
    catch (error) {
      this.error = error;
    }
    this.loading = false;

  }

  navigateToCustomization() {
    this.stateService.dispatch(setStepAction({ step: Steps.customizationStep }))
    this.router.navigate([Steps.customizationStep.url]);

  }

}
