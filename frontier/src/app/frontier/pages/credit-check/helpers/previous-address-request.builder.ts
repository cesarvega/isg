import { AddressInterface } from "src/app/isg-shared/interfaces/address";
import { PreviousAddressInterface } from "src/app/isg-shared/interfaces/previous_address";

export const buildPreviousAddressRequest = (address: AddressInterface) => {
    const { addressLine1, addressLine2, city, stateProvince, zipCode } = address;
    const previousAddress: PreviousAddressInterface = { addressLine1, addressLine2, zipCode, stateAbbreviation: stateProvince, cityName: city }
    return {
        previousAddress: [
            previousAddress
        ]
    }
}