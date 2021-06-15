import { AddressInterface } from "src/app/isg-shared/interfaces/address";

export interface AddressSearchResponseInterface {
  addresses: Array<AddressSearchResponseItemInterface>;
}

export interface AddressSearchResponseItemInterface {
  addressKey: string,
  address: AddressInterface
  samRecords: SamRecordsInterface[],
}

export interface SamRecordsInterface {
  environment: string,
  controlNumber: string,
}
