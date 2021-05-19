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
        url: `${urlPrefix}creditCheck`,
        step: 3
    },
    billingStep: {
        url: `${urlPrefix}billing`,
        step: 4
    },
    confirmationStep: {
        url: `${urlPrefix}confirmation`,
        step: 5
    },
}

