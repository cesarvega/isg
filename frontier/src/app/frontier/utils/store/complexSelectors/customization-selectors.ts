import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/interfaces/app.state";
import { getParsedAddress } from "../../../pages/address-search/helpers/get-parsed-adress";
import { AddressSearchResponseItemInterface } from "../../services/interfaces/qualification/address-search-response";
import { ChildEntity, Item } from "../interfaces/quote";
import { selectQuoteItems, selectSelectedAddress, selectSelectedCustomizations } from "../selectors";

export const selectAddressSearchRequest = (state: AppState) => state.frontier

export const selectMonthlyCustomizations = createSelector(
    selectSelectedCustomizations,
    selectQuoteItems,
    (customizations: ChildEntity[], configuration: Item[]) => {
        let items: ChildEntity[] = [];
        for (let item of configuration) {
            for (let customization of item.productConfiguration.ChildEntity) {
                if (customization.Price) {
                    for (let price of customization.Price) {
                        if (price.rateRecurring) {
                            items.push(customization)
                        }
                    }
                }
            }
        }
        for (let customization of customizations) {
            if (customization.Price) {
                for (let price of customization.Price) {
                    if (price.rateRecurring) {
                        items.push(customization)
                    }
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
            if (customization.Price) {
                for (let price of customization.Price) {
                    if (price.rateNonRecurring) {
                        items.push(customization)
                    }
                }
            }
        }
        return items;
    }
);