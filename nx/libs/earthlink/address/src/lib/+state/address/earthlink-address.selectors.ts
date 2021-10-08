import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EARTHLINK_ADDRESS_FEATURE_KEY,
  State,
  earthlinkAddressAdapter,
} from './earthlink-address.reducer';

// Lookup the 'EarthlinkAddress' feature state managed by NgRx
export const getEarthlinkAddressState = createFeatureSelector<State>(
  EARTHLINK_ADDRESS_FEATURE_KEY
);

const { selectAll, selectEntities } = earthlinkAddressAdapter.getSelectors();

export const getEarthlinkAddressLoaded = createSelector(
  getEarthlinkAddressState,
  (state: State) => state.loading
);

export const getEarthlinkAddressError = createSelector(
  getEarthlinkAddressState,
  (state: State) => state.error
  
);

export const getAllEarthlinkAddress = createSelector(
  getEarthlinkAddressState,
  (state: State) => selectAll(state)
);

export const getEarthlinkAddressEntities = createSelector(
  getEarthlinkAddressState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getEarthlinkAddressState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEarthlinkAddressEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);


export const getAddressState = createSelector(
  getEarthlinkAddressState,
  (state: State) => {error: state.error ? state.error : null}
)

export const getError = createSelector(
  getEarthlinkAddressState,
  (state: State) => state.error
)