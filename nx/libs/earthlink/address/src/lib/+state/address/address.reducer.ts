import { createReducer, on, Action } from '@ngrx/store';
//import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AddressActions from './address.actions';
import { Address } from '../../containers/address/interfaces/address';

export interface State {
    error: any,
    loading: boolean,
    request: Address,
    response: any,
    transaction: string,
    params: any[],
    message?: any
  }
  
export const initialState: State = {
    error: null,
    request: { 
        AddressLine1: "", AddressLine2: "", City: "",
        State: "", ZipCode: "", FirtstName: "", LastName: "",
        Email: "", Phone: "", IsBusiness: false, AltPhone: ""
    },
    response: null,
    loading: false,
    transaction: "",
    params: [],
    message: null,
}

const addressReducer = createReducer(
    initialState,
    on(AddressActions.errorAction, (state, {error }) => ({
        ...state,
        error,
        loading: false
    }
    )),
    on(AddressActions.addressRequest, (state, { uuid } ) => ({
      ...state,
      loading: false,
      uuid
    })),
);

export function reducer(state: any | undefined, action: Action ){
    console.log('reducer reached');
    return addressReducer(state, action);
}