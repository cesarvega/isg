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
  request: { 
    address_line1: "", address_line2: "", city: "",
    state: "", zip: "", first_name: "", last_name: "",
    email: "", phone: "", is_business: "", alt_phone: "", error: "", uuid: ""
  //  AddressLine1: "": "", AddressLine2: "", City: "", State: "", Zip: { ZipCode: "" } 
  
  },
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
        request: address,
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


  )

export function reducer(state: State | undefined, action: Action) {
  return earthlinkAddressReducer(state, action);
}
