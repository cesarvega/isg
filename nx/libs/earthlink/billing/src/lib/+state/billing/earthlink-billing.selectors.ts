import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EARTHLINK_BILLING_FEATURE_KEY,
  State,
  earthlinkBillingAdapter,
} from './earthlink-billing.reducer';

// Lookup the 'EarthlinkBilling' feature state managed by NgRx
export const getEarthlinkBillingState = createFeatureSelector<State>(
  EARTHLINK_BILLING_FEATURE_KEY
);

const { selectAll, selectEntities } = earthlinkBillingAdapter.getSelectors();

export const getEarthlinkBillingLoaded = createSelector(
  getEarthlinkBillingState,
  (state: State) => state.loaded
);

export const getEarthlinkBillingError = createSelector(
  getEarthlinkBillingState,
  (state: State) => state.error
);

export const getAllEarthlinkBilling = createSelector(
  getEarthlinkBillingState,
  (state: State) => selectAll(state)
);

export const getEarthlinkBillingEntities = createSelector(
  getEarthlinkBillingState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getEarthlinkBillingState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEarthlinkBillingEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
