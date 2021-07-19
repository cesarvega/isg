import { AddressInterface } from "src/app/isg-shared/interfaces/address";

export interface IdentityFormInterface {
  dateOfBirth,
  ssn: string
}

export interface AccountFormInterface {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  secondaryPhoneNumber: string,
  billingAddress?: AddressInterface,
}

export interface creditCheckInterface {
  alias: string
  identityForm: IdentityFormInterface,
  accountForm: AccountFormInterface
}
