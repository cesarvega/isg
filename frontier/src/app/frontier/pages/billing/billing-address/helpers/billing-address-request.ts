import { CustomerDataInterface } from "src/app/frontier/utils/store/interfaces/customer-data";
import { AddressInterface } from "src/app/isg-shared/interfaces/address";
import { UpdateBillingAddressRequestInterface } from "./billing-address.interface";


export const buildUpdateBillingAddressRquest = (customerData: CustomerDataInterface, address: AddressInterface): UpdateBillingAddressRequestInterface => {
    const updateBillingAddressRequest: UpdateBillingAddressRequestInterface = {
        PartyRoleBillingAddress_1_PostalAddress_rowidObject: customerData.partyAccountView.PartyRoleBillingAddress_1_PostalAddress_rowidObject,
        PartyRoleBillingAddress_1_rowidObject: customerData.partyAccountView.PartyRoleBillingAddress_1_rowidObject,
        billing: {
            billingAddress: {
                rowidObject: customerData.partyAccountView.PartyRoleBillingAddress_1_PostalAddress_rowidObject,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                city: address.city,
                stateCode: address.stateProvince,
                postalCode: address.postalCode,
            }
        }
    }
    return updateBillingAddressRequest;
}