import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/interfaces/app.state";
import { getParsedAddress } from "../../address-search/helpers/get-parsed-adress";
import { AddressSearchResponseItemInterface } from "../../services/interfaces/qualification/address-search-response";
import { selectSelectedAddress } from "../selectors";

export const selectAddressSearchRequest = (state: AppState) => state.frontier

export const selectParsedAddress = createSelector(
    selectSelectedAddress,
    (selectedAddress: AddressSearchResponseItemInterface) => {
        return getParsedAddress(selectedAddress)
    }
);