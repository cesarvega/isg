import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EarthlinkAccountActions from './earthlink-account.actions';
import { EarthlinkAccountEntity } from './earthlink-account.models';

export const EARTHLINK_ACCOUNT_FEATURE_KEY = 'earthlinkAccount';

export interface State extends EntityState<EarthlinkAccountEntity> {
  selectedId?: string | number; // which EarthlinkAccount record has been selected
  loaded: boolean; // has the EarthlinkAccount list been loaded
  error?: string | null; // last known error (if any);
  response: any | null;
}

export interface EarthlinkAccountPartialState {
  readonly [EARTHLINK_ACCOUNT_FEATURE_KEY]: State;
}

export const earthlinkAccountAdapter: EntityAdapter<EarthlinkAccountEntity> =
  createEntityAdapter<EarthlinkAccountEntity>();

export const initialState: State = earthlinkAccountAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  response: null,
});

const earthlinkAccountReducer = createReducer(
  initialState,
  on(EarthlinkAccountActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    EarthlinkAccountActions.loadEarthlinkAccountSuccess,
    (state, { earthlinkAccount }) =>
      earthlinkAccountAdapter.setAll(earthlinkAccount, {
        ...state,
        loaded: true,
      })
  ),
  on(
    EarthlinkAccountActions.loadEarthlinkAccountFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return earthlinkAccountReducer(state, action);
}
