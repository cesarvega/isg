import { state } from '@angular/animations';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AddressActions from './earthlink-address.actions';
import { EarthlinkAddressEntity } from './earthlink-address.models';

export const EARTHLINK_ADDRESS_FEATURE_KEY = 'earthlinkAddress';

export interface State extends EntityState<EarthlinkAddressEntity> {
  selectedId?: string | number; // which EarthlinkAddress record has been selected
  loading: boolean; // has the EarthlinkAddress list been loaded
  error?: string | null; // last known error (if any),
  request: any | {};
  response: any | null;
}

export interface EarthlinkAddressPartialState {
  readonly [EARTHLINK_ADDRESS_FEATURE_KEY]: State;
}

export const earthlinkAddressAdapter: EntityAdapter<EarthlinkAddressEntity> =
  createEntityAdapter<EarthlinkAddressEntity>();

export const initialState: State = earthlinkAddressAdapter.getInitialState({
  // set initial required properties
  error: null,
  request: null,
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
      })
    ),
    on(AddressActions.setEarthLinkTransactionId, (state, { earthLinkTransactionId }) =>({
        ...state,
        earthLinkTransactionId
      })
    ),
    on(AddressActions.addressRequest, (state, { address }) => ({
        ...state,
        loading: true,
        response: address,
      })
    ),
    on(AddressActions.addressResponse, (state, { response }) => ({
        ...state,
        loading: false,
        response
      })
    ),
    on(AddressActions.init, (state) => ({
        ...state,
        loaded: false,
        error: null,
      })
    ),
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
      })
    ),
    on(AddressActions.setCustomerType, (state, { customerType }) =>({
        ...state,
        customerType
      })
    ),
    on(AddressActions.errorAction, (state, { error}) => ({
        ...state,
        error
      })
    ),
    on(AddressActions.infoUpdate, (state, { data }) => ({
        ...state,
        request: data.first_name,
      })
    )


  )

export function reducer(state: State | undefined, action: Action) {
  return earthlinkAddressReducer(state, action);
}
