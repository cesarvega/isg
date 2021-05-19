import { AddressSearchResponseInterface, AddressSearchResponseItemInterface } from './address-search-response';
import { ErrorInterface } from './error-interface';
import { AddressInterface } from './frontierAddress';
import { CreateQuoteInterface } from './createQuote';
import { CreateQuoteResponseInterface } from './createQuote copy';
export interface Frontier {
  transactionId: string,
  currentStep: any
  loading: boolean,
  error: ErrorInterface,
  success: string,
  addressRequest: AddressInterface,
  addressSearchResponse: Readonly<AddressSearchResponseInterface>,
  selectedAddress: AddressSearchResponseItemInterface,
  createQuoteRequest: CreateQuoteInterface,
  createQuoteResponse: CreateQuoteResponseInterface,
  quoteId: string,
  offers: null
}

