import { AddressSearchResponseItemInterface } from "../../services/interfaces/qualification/address-search-response";

export const getParsedAddress = (selectedAddress: AddressSearchResponseItemInterface) => {
    const { addressLine1, addressLine2, city, stateProvince, zipCode } = selectedAddress.address;
    return `${addressLine1} ${addressLine2} ${city}, ${stateProvince} ${zipCode}`;

}