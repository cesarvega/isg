import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectStep } from '../store/selectors';
import { Observable } from 'rxjs';
import { Steps } from '../utils/steps';
import { Router } from '@angular/router';
import { displayQualificationStep, displayCreditCheckStep, displayOffersStep } from './validators/validator';
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
  confirmationStep = Steps.confirmationStep

  public displayQualificationStep = displayQualificationStep;
  public displayCreditCheckStep = displayCreditCheckStep;
  public displayOffersStep = displayOffersStep;

  constructor(private store: Store<any>, public router: Router) {
    this.currentStep$ = store.select(selectStep)
  }

  ngOnInit(): void {
  }


  isStepEnabled(step, currentStep) {
    step = step.step;
    currentStep = currentStep.step;
    if (currentStep == this.confirmationStep)
      return false;
    if (step > currentStep) {
      return false;
    }
    return true;
  }

}
