export interface CustomerDataInterface {
    partyAccountView: PartyAccountViewInterface
}

export interface PartyAccountViewInterface {
    PartyRoleBillingAddress_1_PostalAddress_rowidObject: string,
    PartyRoleBillingAddress_1_rowidObject: string,
    PartyRoleBillingAddress_1_PostalAddress_key: KeyInterface
}

export interface KeyInterface {
    rowid: string,
    sourceKey: string
}