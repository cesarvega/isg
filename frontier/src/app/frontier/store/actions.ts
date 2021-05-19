import { createAction, props } from '@ngrx/store';

export const addressSearchRequestAction = createAction('addressSearchRequest', props<any>());
export const addressSearchResponseAction = createAction('addressSearchResponse', props<any>());
export const setErrorAction = createAction('setErrorAction', props<any>());
export const setTransactionIdAction = createAction('setTransactionIdAction', props<{ transactionId: any }>());
export const setSelectedAddressAction = createAction('setSelectedAddressAction', props<any>());
export const setCreateQuoteRequestAction = createAction('setCreateQuoteRequestAction', props<any>());
export const setCreateQuoteResponseAction = createAction('setCreateQuoteResponse', props<any>());
export const setStepAction = createAction('setStepAction', props<{ step: any }>());
export const resetOrderAction = createAction('resetOrderAction');
export const setOffersAction = createAction('setOffersAction', props<any>());