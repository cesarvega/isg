import { AddressSearchResponseItemInterface } from "../../services/interfaces/qualification/address-search-response";

export const getParsedAddress = (selectedAddress: AddressSearchResponseItemInterface) => {
    if (selectedAddress?.address) {
        const { addressLine1, addressLine2, city, stateProvince, zipCode } = selectedAddress.address;
        return `${addressLine1} ${addressLine2} ${city}, ${stateProvince} ${zipCode}`;
    }
    return "";
}