import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EarthlinkOffersActions from './earthlink-offers.actions';
import { EarthlinkOffersEntity } from './earthlink-offers.models';

export const EARTHLINK_OFFERS_FEATURE_KEY = 'earthlinkOffers';

export interface State extends EntityState<EarthlinkOffersEntity> {
  selectedId?: string | number; // which EarthlinkOffers record has been selected
  loaded: boolean; // has the EarthlinkOffers list been loaded
  error?: string | null; // last known error (if any),
  //request: any | null;
}

export interface EarthlinkOffersPartialState {
  readonly [EARTHLINK_OFFERS_FEATURE_KEY]: State;
}

export const earthlinkOffersAdapter: EntityAdapter<EarthlinkOffersEntity> =
  createEntityAdapter<EarthlinkOffersEntity>();

export const initialState: State = earthlinkOffersAdapter.getInitialState({
  // set initial required properties
  request: null,
  loaded: false,
});

const earthlinkOffersReducer = createReducer(
  initialState,
  on(EarthlinkOffersActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    EarthlinkOffersActions.loadEarthlinkOffersSuccess,
    (state, { earthlinkOffers }) =>
      earthlinkOffersAdapter.setAll(earthlinkOffers, { ...state, loaded: true })
  ),
  on(EarthlinkOffersActions.loadEarthlinkOffersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
    on(EarthlinkOffersActions.productsActionRequest, (state, { request }) => ({
      ...state,
      loading: true,
      request: request
    }) 
  )
);

export function reducer(state: State | undefined, action: Action) {
  return earthlinkOffersReducer(state, action);
}
