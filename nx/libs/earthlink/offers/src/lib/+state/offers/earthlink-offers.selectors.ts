import { createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EARTHLINK_OFFERS_FEATURE_KEY,
  State,
  earthlinkOffersAdapter,
  EARTHLINK_ADDRESS_FEATURE_KEY
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
  (state: State) => state.response
);

// export const getEarthlinkOffersEntities = createSelector(
//   getEarthlinkOffersState,
//   (state: State) => selectEntities(state)
// );

export const getSelectedId = createSelector(
  getEarthlinkOffersState,
  (state: State) => state.selectedId
);

// export const getSelected = createSelector(
//   getEarthlinkOffersEntities,
//   getSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );

export const getAddressState = createFeatureSelector<any>(
  EARTHLINK_ADDRESS_FEATURE_KEY
);

export const getParsedAddress: any = createSelector(
  getAddressState,
  (state: any) => {
    const request = state.request;
    const { address_line1, address_line2, zip_code } = request;
    const parsedAddress = `${address_line1} ${address_line2 ?? ""} ${zip_code} `;
    return parsedAddress;

  }
);

export const getProducts = createSelector(
  getAddressState,
  (state: any) => {
    return state.request;
  }
);

export const getCurrentProduct = createSelector(
  getEarthlinkOffersState,
  (state: any) =>{
    return state.product;
  }
)

export const sendProductActionRequestResult = createSelector(
  getEarthlinkOffersState,
  (state: any) =>{
    return state.error;
  }
)