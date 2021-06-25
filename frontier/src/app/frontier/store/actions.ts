import { createAction, props } from '@ngrx/store';
import { CustomerInterface } from '../services/interfaces/customer/customer';
import { TaskInterface } from './interfaces/task-interface';

export const addressSearchRequestAction = createAction('addressSearchRequest', props<any>());
export const addressSearchResponseAction = createAction('addressSearchResponse', props<any>());
export const setErrorAction = createAction('setErrorAction', props<any>());
export const setTransactionIdAction = createAction('setTransactionIdAction', props<{ transactionId: any }>());
export const setSelectedAddressAction = createAction('setSelectedAddressAction', props<any>());
export const setCreateQuoteRequestAction = createAction('setCreateQuoteRequestAction', props<any>());
export const setCreateQuoteResponseAction = createAction('setCreateQuoteResponse', props<any>());
export const setStepAction = createAction('setStepAction', props<{ step: any }>());
export const resetOrderAction = createAction('resetOrderAction');
export const setOffersAction = createAction('setOffersAction', props<{ offers }>());
export const selectProductsAction = createAction('selectProductsAction', props<{ products }>());
export const removeProductAction = createAction('removeProductAction', props<{ productIds: string[] }>());
export const setCustomerAction = createAction('setCustomerAction', props<{ customer: CustomerInterface }>());
export const setTasksAction = createAction('setTasksAction', props<{ tasks: TaskInterface[] }>());
export const setQuoteAction = createAction('setQuoteAction', props<{ quote }>());
export const setCustomerForms = createAction('setCustomerForms', props<{ accountForm, identityForm }>());
export const setDisclosuresAction = createAction('setDisclosures', props<{ disclosures }>());
export const setReservationAction = createAction('setReservationAction', props<{ reservation }>());
export const addClosedTaskAction = createAction('addClosedTaskAction', props<{ taskName }>());
export const validateQuoteAction = createAction('validateQuoteAction');
export const acceptDisclosuresAction = createAction('acceptDisclosuresAction');
export const setDepositRequirementsAction = createAction('setDepositRequirementsAction', props<{ depositRequirements }>());

