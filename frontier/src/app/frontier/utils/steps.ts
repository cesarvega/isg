const urlPrefix = "/";

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
  scheduleStep: {
    url: `${urlPrefix}schedule`,
    step: 7,
    name: "schedule"
  },
  recapStep: {
    url: `${urlPrefix}recap`,
    step: 8,
    name: "recap"
  },
  confirmationStep: {
    url: `${urlPrefix}confirmation`,
    step: 9,
    name: "confirmation"
  },
}

