import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EARTHLINK_CONFIRMATION_FEATURE_KEY,
  State,
  earthlinkConfirmationAdapter,
} from './earthlink-confirmation.reducer';

// Lookup the 'EarthlinkConfirmation' feature state managed by NgRx
export const getEarthlinkConfirmationState = createFeatureSelector<State>(
  EARTHLINK_CONFIRMATION_FEATURE_KEY
);

const { selectAll, selectEntities } =
  earthlinkConfirmationAdapter.getSelectors();

export const getEarthlinkConfirmationLoaded = createSelector(
  getEarthlinkConfirmationState,
  (state: State) => state.loaded
);

export const getEarthlinkConfirmationError = createSelector(
  getEarthlinkConfirmationState,
  (state: State) => state.error
);

export const getAllEarthlinkConfirmation = createSelector(
  getEarthlinkConfirmationState,
  (state: State) => selectAll(state)
);

export const getEarthlinkConfirmationEntities = createSelector(
  getEarthlinkConfirmationState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getEarthlinkConfirmationState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEarthlinkConfirmationEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
