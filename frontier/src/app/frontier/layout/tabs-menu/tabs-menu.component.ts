import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectStep } from '../../utils/store/selectors';
import { Observable } from 'rxjs';
import { Steps } from '../../utils/steps';
import { Router } from '@angular/router';
import { displayQualificationStep, displayCreditCheckStep, displayOffersStep, displayCustomizationsStep, displayDisclosures, displayBilling, displaySchedule } from './validators/validator';
@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.css']
})
export class TabsMenuComponent implements OnInit {
  active;
  currentStep$: Observable<number>
  qualificationStep = Steps.qualificationStep
  offerStep = Steps.offersStep
  creditCheckStep = Steps.creditCheckStep
  billingStep = Steps.billingStep
  customizationStep = Steps.customizationStep
  disclosureStep = Steps.disclosuresStep
  confirmationStep = Steps.confirmationStep
  scheduleStep = Steps.scheduleStep
  recapStep = Steps.recapStep

  public displayQualificationStep = displayQualificationStep;
  public displayCreditCheckStep = displayCreditCheckStep;
  public displayOffersStep = displayOffersStep;
  public displayCustomizationsStep = displayCustomizationsStep;
  public displayDisclosures = displayDisclosures;
  public displayBilling = displayBilling;
  public displaySchedule = displaySchedule;

  constructor(private store: Store<any>, public router: Router) {
    this.currentStep$ = store.select(selectStep)
  }

  ngOnInit(): void {
  }


  isStepEnabled(step, currentStep) {
    let stepNumber = step.step;
    let currentStepNumber = currentStep.step;
    if (currentStepNumber == this.confirmationStep.step)
      return false;
    if (stepNumber > currentStepNumber) {
      return false;
    }
    return true;
  }

}
