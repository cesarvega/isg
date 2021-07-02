export interface IdentityFormInterface {
  dateOfBirth,
  ssn: string
}

export interface AccountFormInterface {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  secondaryPhoneNumber: string
}

export interface creditCheckInterface {
  alias: string
  identityForm: IdentityFormInterface,
  accountForm: AccountFormInterface
}
