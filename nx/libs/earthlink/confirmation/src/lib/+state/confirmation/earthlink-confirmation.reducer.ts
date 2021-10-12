import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EarthlinkConfirmationActions from './earthlink-confirmation.actions';
import { EarthlinkConfirmationEntity } from './earthlink-confirmation.models';

export const EARTHLINK_CONFIRMATION_FEATURE_KEY = 'earthlinkConfirmation';

export interface State extends EntityState<EarthlinkConfirmationEntity> {
  selectedId?: string | number; // which EarthlinkConfirmation record has been selected
  loaded: boolean; // has the EarthlinkConfirmation list been loaded
  error?: string | null; // last known error (if any)
}

export interface EarthlinkConfirmationPartialState {
  readonly [EARTHLINK_CONFIRMATION_FEATURE_KEY]: State;
}

export const earthlinkConfirmationAdapter: EntityAdapter<EarthlinkConfirmationEntity> =
  createEntityAdapter<EarthlinkConfirmationEntity>();

export const initialState: State = earthlinkConfirmationAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const earthlinkConfirmationReducer = createReducer(
  initialState,
  on(EarthlinkConfirmationActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    EarthlinkConfirmationActions.loadEarthlinkConfirmationSuccess,
    (state, { earthlinkConfirmation }) =>
      earthlinkConfirmationAdapter.setAll(earthlinkConfirmation, {
        ...state,
        loaded: true,
      })
  ),
  on(
    EarthlinkConfirmationActions.loadEarthlinkConfirmationFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return earthlinkConfirmationReducer(state, action);
}
