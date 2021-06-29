
export interface CustomerInterface {
  accountName: string,
  firstName: string,
  lastName: string,
  accountUuid?: string,
  accountPinId?: string,
  billing?: BillingInterface,
  contacts?: ContactItemInterface
  communicationPreferences?: CommunicationPreferencesInterface

}

export interface BillingInterface {
  billingAddress: AddressInterface,
}

export interface AddressInterface {
  addressLine1: string,
  addressLine2: string,
  city: string,
  stateProvince: string,
  postalCode: string,
}

export interface ContactItemInterface {
  item: ContactInterface[],
}

export interface ContactInterface {
  primary: Boolean,
  fullName: string,
  firstName: string,
  lastName: string,
  telephones: TelephoneItemsInterface,
  emailAddresses: EmailItemsInterface,
  creditProfile: CreditProfileInterface,
}

export interface TelephoneItemsInterface {
  item: TelephoneInterface[]
}

export interface TelephoneInterface {
  phoneNumber: string,
  phoneType: string,
  isPrimary: Boolean
}

export interface EmailItemsInterface {
  item: EmailInterface[]
}

export interface EmailInterface {
  address: string,
  isPrimary: Boolean
}


export interface CreditProfileInterface {
  ssn: string,
  dateOfBirth
}

export interface CommunicationPreferencesInterface {
  item: CommunicationItemInterface[],
}

export interface CommunicationItemInterface {
  communicationType: string,
  optIn: Boolean,
  mediaType: string,
}
