import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { CustomerApiService } from '../../utils/services/api/customer-api.service';
import { CustomerContactBuilder } from '../../utils/services/builders/customer/customer-contact-builder';
import { IdentityFormInterface, AccountFormInterface, creditCheckInterface } from '../../utils/services/interfaces/customer/credit-check-form';
import { selectQuoteId, selectSelectedAddress } from '../../utils/store/selectors';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { setStepAction } from '../../utils/store/actions';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from '../../utils/steps';
import { StateService } from '../../utils/services/state.service';
import { creditCheckTaskName, customerDetailsTaskName } from '../../utils/taskNames';
import { creditCheckTestCases } from './test-cases';
import { faComment } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-credit-check',
  templateUrl: './credit-check.component.html',
  styleUrls: ['./credit-check.component.css']
})
export class CreditCheckComponent implements OnInit {

  faComment = faComment;
  constructor(private customerApiService: CustomerApiService, private customerContactBuilder: CustomerContactBuilder
    , private tasksApiService: TasksApiService, private route: ActivatedRoute, private router: Router, private stateService: StateService) { }

  showForm = false;
  quoteId;
  customerDetailTask: TaskInterface;
  address;
  accountFormValues: any = null;
  identityFormValues: any = null;
  loading: Boolean = false;
  error: ErrorInterface = null;
  selectedTestCase: string;
  creditCheckTestCases = creditCheckTestCases
  @ViewChild('accordion') accordionComponent: NgbAccordion;

  ngOnInit(): void {
    this.quoteId = this.stateService.getValueFromSelector(selectQuoteId);
    this.address = this.stateService.getValueFromSelector(selectSelectedAddress)
    this.accountFormValues = this.stateService.getFrontierState().accountForm;
    this.identityFormValues = this.stateService.getFrontierState().identityForm;
  }

  ngAfterViewInit() {
    if (this.identityFormValues) {
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

      this.stateService.dispatchAction(setStepAction({ step: Steps.customizationStep }))
      this.router.navigate([Steps.customizationStep.url]);
    }
    catch (error) {
      this.error = error;
    }
    this.loading = false;

  }

}
