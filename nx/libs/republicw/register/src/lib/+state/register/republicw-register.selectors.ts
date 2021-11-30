import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REPUBLICW_REGISTER_FEATURE_KEY,
  State,
  republicwRegisterAdapter,
} from './republicw-register.reducer';

// Lookup the 'RepublicwRegister' feature state managed by NgRx
export const getRepublicwRegisterState = createFeatureSelector<State>(
  REPUBLICW_REGISTER_FEATURE_KEY
);

const { selectAll, selectEntities } = republicwRegisterAdapter.getSelectors();

export const getRepublicwRegisterLoaded = createSelector(
  getRepublicwRegisterState,
  (state: State) => state.loaded
);

export const getRepublicwRegisterError = createSelector(
  getRepublicwRegisterState,
  (state: State) => state.error
);

export const getAllRepublicwRegister = createSelector(
  getRepublicwRegisterState,
  (state: State) => selectAll(state)
);

export const getRepublicwRegisterEntities = createSelector(
  getRepublicwRegisterState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getRepublicwRegisterState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getRepublicwRegisterEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
