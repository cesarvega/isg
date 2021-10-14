import { createAction, props } from '@ngrx/store';
import { Address } from '../../containers/address/interfaces/address';
export const init = createAction('[Address Page] Init');

export const addressRequest = createAction(
  'addressRequest',
  props<{ address: Address }>()
);


export const closeAddressError = createAction(
  'closeAddressError'
);


export const addressResponse = createAction(
  'addressResponse',
  props<{ response: any }>()
);

export const setTransaction = createAction(
  'transaction',
  props<{ transaction: string }>()
);


export const setEarthLinkTransactionId = createAction(
  'earthLinkTransactionId',
  props<{ earthLinkTransactionId: string }>()
);


export const loading = createAction(
  'loading',
);


export const errorAction = createAction(
  'error',
  props<{ error: any }>()
);

export const setCustomerType = createAction(
  'setCustomerType',
  props<{ customerType: any }>()
);

export const setParams = createAction(
  'setParams',
  props<{ params: any }>()
);

export const loadEarthlinkAddressSuccess = createAction(
  'loadEarthlinkAddressSuccess',
  props<{ response: any }>()
)

export const loadEarthlinkAddressFailure = createAction(
  'loadEarthlinkAddressFailure',
  props<{ error: any }>()
)

export const infoUpdate = createAction(
  'infoUpdate',
  props<{ data: any }>()
)