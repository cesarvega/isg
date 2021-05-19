import { AddressInterface } from "src/app/isg-shared/interfaces/address";
import { SamRecordsInterface } from './samRecords';

export interface AddressSearchResponseInterface {
  addresses: Array<AddressSearchResponseItemInterface>;
}

export interface AddressSearchResponseItemInterface {
  addressKey: AddressInterface,
  samRecords: SamRecordsInterface[],
}