export interface IdentityFormInterface {
  dateOfBirth,
  ssn: String
}

export interface AccountFormInterface {
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String
}

export interface creditCheckInterface {
  alias: string
  identityForm: IdentityFormInterface,
  accountForm: AccountFormInterface
}
