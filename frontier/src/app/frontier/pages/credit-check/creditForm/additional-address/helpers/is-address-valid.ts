import { AddressInterface } from "src/app/isg-shared/interfaces/address";

export const isAddressValid = (address: AddressInterface) => {
  const { addressLine1, city, stateProvince, zipCode } = address;
  if (!addressLine1 || !city || !stateProvince || !zipCode) {
    return false;
  }
  //validate zip code
  let zipCodeRegex: RegExp = /^\d{5}(?:[-\s]\d{4})?$/;
  const expressionMatched = zipCodeRegex.test(zipCode);
  if (!expressionMatched) {
    return false;
  }
  return true;
}