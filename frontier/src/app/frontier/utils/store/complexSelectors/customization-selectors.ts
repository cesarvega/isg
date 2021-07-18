import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/interfaces/app.state";
import { getParsedAddress } from "../../../pages/address-search/helpers/get-parsed-adress";
import { AddressSearchResponseItemInterface } from "../../services/interfaces/qualification/address-search-response";
import { ChildEntity } from "../interfaces/quote";
import { selectSelectedAddress, selectSelectedCustomizations } from "../selectors";

export const selectAddressSearchRequest = (state: AppState) => state.frontier

export const selectMonthlyCustomizations = createSelector(
    selectSelectedCustomizations,
    (customizations: ChildEntity[]) => {
        let items: ChildEntity[] = [];
        for (let customization of customizations) {
            for (let price of customization.Price) {
                if (price.rateRecurring) {
                    items.push(customization)
                }
            }
        }
        return items;
    }
);


export const selectOneTimeCustomizations = createSelector(
    selectSelectedCustomizations,
    (customizations: ChildEntity[]) => {
        let items: ChildEntity[] = [];
        for (let customization of customizations) {
            for (let price of customization.Price) {
                if (price.rateNonRecurring) {
                    items.push(customization)
                }
            }
        }
        return items;
    }
);