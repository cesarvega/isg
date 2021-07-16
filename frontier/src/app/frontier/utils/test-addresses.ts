export interface AddressFormInterface {
  alias: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  stateProvince: string,
  zipCode: string,
}
const backBalance: AddressFormInterface = {
  addressLine1: '7915 Ridgeside Ln',
  addressLine2: '',
  city: 'Fortwayne',
  stateProvince: 'IN',
  zipCode: '46835',
  alias: 'Back Balance'
};
const testFL: AddressFormInterface = {
  addressLine1: '1339 Capri Dr',
  addressLine2: '',
  city: 'Pacific Palisades',
  stateProvince: 'CA',
  zipCode: '90272',
  alias: 'Cooper CA'
};
const testVA: AddressFormInterface = {
  addressLine1: '7109 Jessup Ct',
  addressLine2: '',
  city: 'Plano',
  stateProvince: 'TX',
  zipCode: '75074',
  alias: 'Fiber TX'
};
const testMultiple: AddressFormInterface = {
  addressLine1: '1651 Sailing Hawks Drive',
  addressLine2: '',
  city: 'LAKE HAVASU CITY',
  stateProvince: 'AZ',
  zipCode: '86404',
  alias: 'Multiple Address AZ'
};
export const frontierTestAddresses: ReadonlyArray<AddressFormInterface> = [
  testFL,
  testVA,
  testMultiple,
  backBalance
]
