const urlPrefix = "/frontier/";

export const Steps = {
  qualificationStep: {
    url: `${urlPrefix}addressSearch`,
    step: 1
  },
  offersStep: {
    url: `${urlPrefix}offers`,
    step: 2
  },
  creditCheckStep: {
    url: `${urlPrefix}credit-check`,
    step: 3
  },
  customizationStep: {
    url: `${urlPrefix}customizations`,
    step: 4
  },
  billingStep: {
    url: `${urlPrefix}billing`,
    step: 5
  },
  confirmationStep: {
    url: `${urlPrefix}confirmation`,
    step: 6
  },
}

