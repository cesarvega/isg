import { StepInterface, Steps } from "../../../utils/steps";
import { displayStep } from "./common";

export const displayQualificationStep = (qualificationStep: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(qualificationStep, currentStep))
        return false;
    if (currentStep.name === Steps.offersStep.name)
        return true
    return false
}

export const displayOffersStep = (qualificationStep: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(qualificationStep, currentStep))
        return false;
    if (currentStep.name === Steps.creditCheckStep.name)
        return true
    return false
}

export const displayCreditCheckStep = (qualificationStep: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(qualificationStep, currentStep))
        return false;
    return false;
}