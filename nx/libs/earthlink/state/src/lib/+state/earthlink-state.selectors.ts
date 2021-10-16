import { createFeatureSelector, createSelector } from '@ngrx/store';

const ADDRESS_FEATURE_KEY = 'earthlinkAddress';
const PRODUCT_FEATURE_KEY = 'earthlinkOffers';
const ACCOUNT_FEATURE_KEY = 'earthlinkAccount';
const BILLING_FEATURE_KEY = 'earthlinkBilling';
const CONFIRMATION_FEATURE_KEY = 'earthlinkConfirmation';

// Lookup the 'Address' feature state managed by NgRx
export const getAddressState = createFeatureSelector<any>(
    ADDRESS_FEATURE_KEY
);

export const getOffersState = createFeatureSelector<any>(
    PRODUCT_FEATURE_KEY
);

export const getProductState = createFeatureSelector<any>(
    PRODUCT_FEATURE_KEY,
)

export const getAccountState = createFeatureSelector<any>(
    ACCOUNT_FEATURE_KEY
);

export const getBillingState = createFeatureSelector<any>(
    BILLING_FEATURE_KEY
);

export const getConfirmationState = createFeatureSelector<any>(
    CONFIRMATION_FEATURE_KEY
)

// export const getInstallationState = createFeatureSelector<any>(
//     CONFIRMATION_FEATURE_KEY
// );

export const getParamPhoneNumber: any = createSelector(
    getAddressState,
    (state: any) => {
        if (state) {
            return state.params?.phoneNumber;
        }
    }
);

export const getMessage: any = createSelector(
    getAddressState,
    (state: any) => {
        if (state) {
            return state.message;
        }
    }
);

export const getAccount: any = createSelector(
    getAccountState,
    (state: any) => {
        if (state) {
            return state.response;
        }
    }
)

export const getAccountFailure: any = createSelector(
    getAccount,
    (state: any) => {
        if( state && state.error ){
            return state;
        } 
    }
)