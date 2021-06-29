import { StepInterface, Steps } from "../../../utils/steps";

export const displayStep = (step: StepInterface, currentStep: StepInterface) => {
    if (currentStep.step == Steps.customizationStep.step)
        return false;
    if (step.step > currentStep.step) {
        return false;
    }
    return true;
}