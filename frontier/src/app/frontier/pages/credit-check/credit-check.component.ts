import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { CustomerApiService } from '../../utils/services/api/customer-api.service';
import { CustomerContactBuilder } from '../../utils/services/builders/customer/customer-contact-builder';
import { IdentityFormInterface, AccountFormInterface, creditCheckInterface } from '../../utils/services/interfaces/customer/credit-check-form';
import { Store } from '@ngrx/store';
import { selectQuoteId, selectCustomer, selectSelectedAddress } from '../../utils/store/selectors';
import { ErrorInterface } from '../../utils/services/interfaces/common/error-interface';
import { setCustomerAction, setCustomerForms, setStepAction } from '../../utils/store/actions';
import { TasksApiService } from '../../utils/services/api/tasks-api.service.';
import { getValueFromState } from '../../utils/get-value-from-state';
import { TaskInterface } from '../../utils/store/interfaces/task-interface';
import { AddressInterface } from '../../utils/services/interfaces/customer/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from '../../utils/steps';
import { StateService } from '../../utils/services/state.service';
import { getTaskByNameFromState } from '../../utils/store/complexSelectors/taks';
import { creditCheckTaskName, customerDetailsTaskName } from '../../utils/taskNames';
import { creditCheckTestCases } from './test-cases';

@Component({
  selector: 'app-credit-check',
  templateUrl: './credit-check.component.html',
  styleUrls: ['./credit-check.component.css']
})
export class CreditCheckComponent implements OnInit {

  constructor(private customerApiService: CustomerApiService, private customerContactBuilder: CustomerContactBuilder
    , private tasksApiService: TasksApiService, private route: ActivatedRoute, private router: Router, private stateService: StateService) { }

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
    this.getTasks(this.quoteId);
    this.address = this.stateService.getValueFromSelector(selectSelectedAddress)

    this.accountFormValues = this.stateService.getFrontierState().accountForm;
    this.identityFormValues = this.stateService.getFrontierState().identityForm;
  }

  ngAfterViewInit() {
    if (this.identityFormValues) {
      this.accordionComponent.toggle("verify-identity-panel");
    }
  }
  async getTasks(quoteId) {
    try {
      return await this.tasksApiService.getTasks(quoteId);
    } catch (error) {
      this.error = error;
    }
  }

  getCustomer() {
    return this.stateService.getValueFromSelector(selectCustomer)
  }

  getAccountUuid(customer) {
    return customer.accountUuid
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
    this.stateService.dispatchAction(setCustomerForms({ accountForm, identityForm }))
    let customer = this.customerContactBuilder.buildAccountAndVerifyInformation(accountForm, identityForm, this.getCustomer(), this.address.address);
    try {
      await this.customerApiService.updateCustomer(customer, this.quoteId);
      this.customerDetailTask = this.stateService.getValueFromSelector(getTaskByNameFromState(customerDetailsTaskName))
      // the customer detail task could be null if this task is already closed
      // need to ask what to do in that case, when we want to update the customer infoormation
      // but the task is already closed
      if (this.customerDetailTask && (!this.stateService.isTaskClosed(customerDetailsTaskName)))
        await this.tasksApiService.closeTask(this.quoteId, this.customerDetailTask);
      await this.customerApiService.creditCheck(this.getAccountUuid(customer), this.quoteId);

      await this.getTasks(this.quoteId);
      let creditCheckTask: TaskInterface = this.stateService.getValueFromSelector(getTaskByNameFromState(creditCheckTaskName))
      if (creditCheckTask && (!this.stateService.isTaskClosed(creditCheckTaskName)))
        await this.tasksApiService.closeTask(this.quoteId, creditCheckTask);

      this.stateService.dispatchAction(setStepAction({ step: Steps.customizationStep }))
      this.router.navigate(['../customizations'], { relativeTo: this.route });
    }
    catch (error) {
      this.error = error;
    }
    this.loading = false;

  }

}
