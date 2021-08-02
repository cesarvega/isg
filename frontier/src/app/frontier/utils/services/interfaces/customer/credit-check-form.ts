import { AddressInterface } from "src/app/isg-shared/interfaces/address";

export interface CreditFormInterface {
  alias?: string,
  previousAddress?: AddressInterface;
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  secondaryPhoneNumber: string,
  dateOfBirth,
  ssn: string
}
