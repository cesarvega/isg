import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EARTHLINK_OFFERS_FEATURE_KEY,
  State,
  earthlinkOffersAdapter,
} from './earthlink-offers.reducer';

// Lookup the 'EarthlinkOffers' feature state managed by NgRx
export const getEarthlinkOffersState = createFeatureSelector<State>(
  EARTHLINK_OFFERS_FEATURE_KEY
);

const { selectAll, selectEntities } = earthlinkOffersAdapter.getSelectors();

export const getEarthlinkOffersLoaded = createSelector(
  getEarthlinkOffersState,
  (state: State) => state.loaded
);

export const getEarthlinkOffersError = createSelector(
  getEarthlinkOffersState,
  (state: State) => state.error
);

export const getAllEarthlinkOffers = createSelector(
  getEarthlinkOffersState,
  (state: State) => state
);

export const getEarthlinkOffersEntities = createSelector(
  getEarthlinkOffersState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getEarthlinkOffersState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEarthlinkOffersEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
