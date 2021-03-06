import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EarthlinkBillingActions from './earthlink-billing.actions';
import { EarthlinkBillingEntity } from './earthlink-billing.models';
import { iPayment } from '../../interfaces/payment';


export const EARTHLINK_BILLING_FEATURE_KEY = 'earthlinkBilling';

export interface State extends EntityState<EarthlinkBillingEntity> {
  selectedId?: string | number; // which EarthlinkBilling record has been selected
  loaded: boolean; // has the EarthlinkBilling list been loaded
  error?: string | null; // last known error (if any);
  payment: null;
}

export interface EarthlinkBillingPartialState {
  readonly [EARTHLINK_BILLING_FEATURE_KEY]: State;
}

export const earthlinkBillingAdapter: EntityAdapter<EarthlinkBillingEntity> =
  createEntityAdapter<EarthlinkBillingEntity>();

export const initialState: State = earthlinkBillingAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  payment: null,
  response: null,
});

const earthlinkBillingReducer = createReducer(
  initialState,
  on(EarthlinkBillingActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    EarthlinkBillingActions.loadEarthlinkBillingSuccess,
    (state, { earthlinkBilling }) =>
      earthlinkBillingAdapter.setAll(earthlinkBilling, {
        ...state,
        loaded: true,
      })
  ),
  on(
    EarthlinkBillingActions.loadEarthlinkBillingFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(
    EarthlinkBillingActions.paymentSuccess, (state, { payment }) => ({
      ...state,
      response: payment
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return earthlinkBillingReducer(state, action);
}
