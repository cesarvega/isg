export interface AddressFormInterface {
    alias: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    stateProvince: string,
    zipCode: string,
}
const testFL: AddressFormInterface = {
    addressLine1: '328 South Ketch Dr',
    addressLine2: '',
    city: 'Sunrise',
    stateProvince: 'FL',
    zipCode: '33326',
    alias: 'Test Florida'
};
const testVA: AddressFormInterface = {
    addressLine1: '14611 Batavia Dr',
    addressLine2: '',
    city: 'Centerville',
    stateProvince: 'VA',
    zipCode: '20120',
    alias: 'Test VA'
};
export const frontierTestAddresses: ReadonlyArray<AddressFormInterface> = [
    testFL,
    testVA
]