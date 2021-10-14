import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
    EARTHLINK_ADDRESS_FEATURE_KEY,
    State
} from '@nx/earthlink/address';

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