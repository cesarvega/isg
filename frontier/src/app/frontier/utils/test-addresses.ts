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

const cooperAZ: AddressFormInterface = {
  addressLine1: '2352 ACOMA DR',
  addressLine2: '',
  city: 'BULLHEAD CITY',
  stateProvince: 'AZ',
  zipCode: '86442',
  alias: 'cooperAZ'
};
const fiosCA: AddressFormInterface = {
  addressLine1: '6566 DOLBOW WY',
  addressLine2: '',
  city: 'ARBUCKLE',
  stateProvince: 'CA',
  zipCode: '95912',
  alias: 'fiosCA'
};
const vantageCooperCT: AddressFormInterface = {
  addressLine1: '23 BAILEY RD',
  addressLine2: '',
  city: 'ANDOVER',
  stateProvince: 'CT',
  zipCode: '06232',
  alias: 'vantageCooperCT'
};
const vantageFiberOptic: AddressFormInterface = {
  addressLine1: '902 W PETTIT AVE',
  addressLine2: '',
  city: 'FORT WAYNE',
  stateProvince: 'IN',
  zipCode: '46807',
  alias: 'vantageFiberOptic'
};
export const frontierTestAddresses: ReadonlyArray<AddressFormInterface> = [
  testFL,
  testVA,
  testMultiple,
  backBalance,
  cooperAZ,
  fiosCA,
  vantageCooperCT,
  vantageFiberOptic
]
