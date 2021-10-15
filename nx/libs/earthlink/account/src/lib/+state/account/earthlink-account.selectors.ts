import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EARTHLINK_ACCOUNT_FEATURE_KEY,
  State,
  earthlinkAccountAdapter,
} from './earthlink-account.reducer';

// Lookup the 'EarthlinkAccount' feature state managed by NgRx
export const getEarthlinkAccountState = createFeatureSelector<State>(
  EARTHLINK_ACCOUNT_FEATURE_KEY
);

//const { selectAll, selectEntities } = earthlinkAccountAdapter.getSelectors();

export const getEarthlinkAccountLoaded = createSelector(
  getEarthlinkAccountState,
  (state: State) => state.loaded
);

export const getEarthlinkAccountError = createSelector(
  getEarthlinkAccountState,
  (state: State) => state.error
);

export const getCurrentAccount = createSelector(
  getEarthlinkAccountState,
  (state: State) => state.response
);

// export const getEarthlinkAccountEntities = createSelector(
//   getEarthlinkAccountState,
//   (state: State) => selectEntities(state)
// );

export const getSelectedId = createSelector(
  getEarthlinkAccountState,
  (state: State) => state.selectedId
);

// export const getSelected = createSelector(
//   getEarthlinkAccountEntities,
//   getSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );
