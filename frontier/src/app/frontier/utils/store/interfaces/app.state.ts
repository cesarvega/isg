import { AddressSearchResponseInterface, AddressSearchResponseItemInterface } from '../../services/interfaces/qualification/address-search-response';
import { ErrorInterface } from '../../services/interfaces/common/error-interface';
import { AddressInterface } from '../../services/interfaces/qualification/address'
import { CreateQuoteInterface } from '../../services/interfaces/qualification/create-quote';
import { CreateQuoteResponseInterface } from '../../services/interfaces/qualification/create-quote-response';
import { CustomerInterface } from '../../services/interfaces/customer/customer';
import { TaskInterface } from './task-interface';
import { ChildEntity, QuoteInterface } from './quote';
import { DisclosureInterface } from '../../services/interfaces/disclosures/disclosure-interface';
import { ReservationInterface } from '../../../pages/billing/interfaces/reservation-interface';
import { OffersInterface } from '../../services/interfaces/products/offers-interface';
import { DepositCollectionResponseInterface } from "../../../pages/billing/payment/interfaces/deposit-collection-response.interface";
import { CreditCheckResultInterface } from '../../services/interfaces/customer/credit-check-result';
import { SubmitOrderResponseInterface } from '../../services/interfaces/order/submit-order-response.interface';
import { CreditFormInterface } from '../../services/interfaces/customer/credit-check-form';
export interface Frontier {
  isBusiness?: boolean;
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
  offers: OffersInterface[],
  selectedProducts: OffersInterface[],
  customer: CustomerInterface,
  tasks: TaskInterface[],
  quote: QuoteInterface,
  accountForm?,
  identityForm?,
  disclosures: DisclosureInterface[],
  reservation: ReservationInterface,
  closedTasks: string[],
  quoteValidated: boolean;
  wereDisclosuresAccepted: boolean;
  depositRequirements;
  CorrelationId: string,
  fundingAccountToken: string,
  depositCollectionResponse: DepositCollectionResponseInterface,
  creditCheckResult: CreditCheckResultInterface,
  order: SubmitOrderResponseInterface,
  creditForm: CreditFormInterface,
  selectedCustomizations: ChildEntity[];
}

