const urlPrefix = "/frontier/";

export interface StepInterface {
  url: string,
  step: number,
  name: string,
}

export const Steps = {
  qualificationStep: {
    path: 'addressSearch',
    url: `${urlPrefix}addressSearch`,
    step: 1,
    name: "addressSearch"
  },
  offersStep: {
    url: `${urlPrefix}offers`,
    step: 2,
    name: "offers",
  },
  creditCheckStep: {
    url: `${urlPrefix}credit-check`,
    step: 3,
    name: "credit-check"
  },
  customizationStep: {
    url: `${urlPrefix}customizations`,
    step: 4,
    name: "customizations"
  },
  disclosuresStep: {
    url: `${urlPrefix}disclosures`,
    step: 5,
    name: "disclosures"
  },
  billingStep: {
    url: `${urlPrefix}billing`,
    step: 6,
    name: "billing"
  },
  recapStep: {
    url: `${urlPrefix}recap`,
    step: 7,
    name: "recap"
  },
  confirmationStep: {
    url: `${urlPrefix}confirmation`,
    step: 8,
    name: "confirmation"
  },
}

