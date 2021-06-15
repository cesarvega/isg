import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface CustomerInterface {
  accountName: String,
  firstName: String,
  lastName: String,
  accountUuid?: String,
  accountPinId?: String,
  billing?: BillingInterface,
  contacts?: ContactItemInterface
  communicationPreferences?: CommunicationPreferencesInterface

}

export interface BillingInterface {
  billingAddress: AddressInterface,
}

export interface AddressInterface {
  addressLine1: String,
  addressLine2: String,
  city: String,
  stateProvince: String,
  postalCode: String,
}

export interface ContactItemInterface {
  item: ContactInterface[],
}

export interface ContactInterface {
  primary: Boolean,
  fullName: String,
  firstName: String,
  lastName: String,
  telephones: TelephoneItemsInterface,
  emailAddresses: EmailItemsInterface,
  creditProfile: CreditProfileInterface,
}

export interface TelephoneItemsInterface {
  item: TelephoneInterface[]
}

export interface TelephoneInterface {
  phoneNumber: String,
  phoneType: String,
  isPrimary: Boolean
}

export interface EmailItemsInterface {
  item: EmailInterface[]
}

export interface EmailInterface {
  address: String,
  isPrimary: Boolean
}


export interface CreditProfileInterface {
  ssn: String,
  dateOfBirth
}

export interface CommunicationPreferencesInterface {
  item: CommunicationItemInterface[],
}

export interface CommunicationItemInterface {
  communicationType: String,
  optIn: Boolean,
  mediaType: String,
}
