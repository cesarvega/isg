export interface UpdateBillingAddressRequestInterface {
    PartyRoleBillingAddress_1_PostalAddress_rowidObject: string,
    PartyRoleBillingAddress_1_rowidObject: string,
    billing: BillingAddressItemInterface
}

export interface BillingAddressItemInterface {
    billingAddress: BillingAddressInterface
}

export interface BillingAddressInterface {
    rowidObject,
    addressLine1,
    addressLine2?,
    addressLine3?,
    city,
    postalCode,
    postalCodeExtension?
    stateCode
}