//import { state } from '@angular/animations';
import { state } from '@angular/animations';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { addressRequest } from '@nx/earthlink/address';

import * as AddressActions from './earthlink-address.actions';
import { EarthlinkAddressEntity } from './earthlink-address.models';

export const EARTHLINK_ADDRESS_FEATURE_KEY = 'address';

export interface State extends EntityState<EarthlinkAddressEntity> {
  selectedId?: string | number; // which EarthlinkAddress record has been selected
  loading: boolean; // has the EarthlinkAddress list been loaded
  error?: string | null; // last known error (if any)
}

export interface EarthlinkAddressPartialState {
  readonly [EARTHLINK_ADDRESS_FEATURE_KEY]: State;
}

export const earthlinkAddressAdapter: EntityAdapter<EarthlinkAddressEntity> =
  createEntityAdapter<EarthlinkAddressEntity>();

export const initialState: State = earthlinkAddressAdapter.getInitialState({
  // set initial required properties
  error: null,
  request: { AddressLine1: "", AddressLine2: "", City: "", State: "", Zip: { ZipCode: "" } },
  response: null,
  transaction: "",
  earthLinkTransactionId: "",
  customerType: "NEW",
  params: [],
  message: null,
  loading: false,
});

const earthlinkAddressReducer = createReducer(
  initialState,
  on(AddressActions.setTransaction, ( state, { transaction }) =>({
    ...state,
    loading: false,
    error: null,
    transaction
  })),
  on(AddressActions.setEarthLinkTransactionId, (state, { earthLinkTransactionId }) =>({
    ...state,
    earthLinkTransactionId
  })),
  on(AddressActions.addressRequest, (state, { address }) => ({
    ...state,
    loading: true,
    request: addressRequest,
  })),
  on(AddressActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AddressActions.loadEarthlinkAddressSuccess,
    (state, { response }) =>
      earthlinkAddressAdapter.setAll(response, {
        ...state,
        loaded: true,
      })
  ),
  on(AddressActions.loadEarthlinkAddressFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(AddressActions.loading, (state) => ({
    ...state,
    loading: true
  }),

  )
);

export function reducer(state: State | undefined, action: Action) {
  return earthlinkAddressReducer(state, action);
}
