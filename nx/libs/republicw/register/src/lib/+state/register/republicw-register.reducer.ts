import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RepublicwRegisterActions from './republicw-register.actions';
import { RepublicwRegisterEntity } from './republicw-register.models';

export const REPUBLICW_REGISTER_FEATURE_KEY = 'republicwRegister';

export interface State extends EntityState<RepublicwRegisterEntity> {
  selectedId?: string | number; // which RepublicwRegister record has been selected
  loaded: boolean; // has the RepublicwRegister list been loaded
  error?: string | null; // last known error (if any)
}

export interface RepublicwRegisterPartialState {
  readonly [REPUBLICW_REGISTER_FEATURE_KEY]: State;
}

export const republicwRegisterAdapter: EntityAdapter<RepublicwRegisterEntity> =
  createEntityAdapter<RepublicwRegisterEntity>();

export const initialState: State = republicwRegisterAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const republicwRegisterReducer = createReducer(
  initialState,
  on(RepublicwRegisterActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    RepublicwRegisterActions.loadRepublicwRegisterSuccess,
    (state, { republicwRegister }) =>
      republicwRegisterAdapter.setAll(republicwRegister, {
        ...state,
        loaded: true,
      })
  ),
  on(
    RepublicwRegisterActions.loadRepublicwRegisterFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return republicwRegisterReducer(state, action);
}
