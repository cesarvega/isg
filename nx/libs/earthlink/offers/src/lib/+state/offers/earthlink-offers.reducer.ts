import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EarthlinkOffersActions from './earthlink-offers.actions';
import { EarthlinkOffersEntity } from './earthlink-offers.models';

export const EARTHLINK_OFFERS_FEATURE_KEY = 'earthlinkOffers';
export const EARTHLINK_ADDRESS_FEATURE_KEY = 'earthlinkAddress';

export interface State extends EntityState<EarthlinkOffersEntity> {
  selectedId?: string | number; // which EarthlinkOffers record has been selected
  loaded: boolean; // has the EarthlinkOffers list been loaded
  error?: string | null; // last known error (if any),
  request: any | {}
}

export interface EarthlinkOffersPartialState {
  readonly [EARTHLINK_OFFERS_FEATURE_KEY]: State;
}

export const earthlinkOffersAdapter: EntityAdapter<EarthlinkOffersEntity> =
  createEntityAdapter<EarthlinkOffersEntity>();

export const initialState: State = earthlinkOffersAdapter.getInitialState({
  // set initial required properties
  error: null,
  request: null,
  loaded: false,
  ids: null,
  order: null
});

const earthlinkOffersReducer = createReducer(
  initialState,
  on(EarthlinkOffersActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  // on(
  //   EarthlinkOffersActions.loadEarthlinkOffersSuccess,
  //   (state, { earthlinkOffers }) =>
  //     earthlinkOffersAdapter.setAll(earthlinkOffers, { ...state, loaded: true })
  // ),
  on(EarthlinkOffersActions.loadEarthlinkOffersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
    on(EarthlinkOffersActions.productsActionRequest, (state, { products }) => ({
      ...state,
      loaded: true,
      request: products,
  })),
  on(EarthlinkOffersActions.productIdsActionRequest, (state, { ids }) => ({
    ...state,
    loaded: true,
    ids,
  })),
  on(EarthlinkOffersActions.orderDetailsActionRequest, (state, { order }) => ({
    ...state,
    order
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return earthlinkOffersReducer(state, action);
}
