import { StepInterface, Steps } from "../../../utils/steps";
import { displayStep } from "./common";

export const displayQualificationStep = (step: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(step, currentStep))
        return false;
    if (currentStep.name === Steps.offersStep.name)
        return true
    return false
}

export const displayOffersStep = (step: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(step, currentStep))
        return false;
    if (currentStep.name === Steps.creditCheckStep.name)
        return true
    return false
}

export const displayCreditCheckStep = (step: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(step, currentStep))
        return false;
    return false;
}

export const displayCustomizationsStep = (step: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(step, currentStep))
        return false;
    if (currentStep.name === Steps.disclosuresStep.name)
        return true
    return false;
}

export const displayDisclosures = (step: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(step, currentStep))
        return false;
    return false;
}

export const displayBilling = (step: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(step, currentStep))
        return false;
    return false;
}


export const displaySchedule = (step: StepInterface, currentStep: StepInterface) => {
    if (!displayStep(step, currentStep))
        return false;
    return false;
}


