import { createReducer, on } from '@ngrx/store';
import { Frontier } from './interfaces/app.state';
import {
  addressSearchRequestAction,
  addressSearchResponseAction,
  setErrorAction,
  setTransactionIdAction,
  setSelectedAddressAction,
  setCreateQuoteRequestAction,
  setCreateQuoteResponseAction,
  setStepAction,
  resetOrderAction,
  setOffersAction,
  removeProductAction,
  setCustomerAction,
  setTasksAction,
  setQuoteAction,
  setCustomerForms,
  selectProductsAction,
  setDisclosuresAction,
  setReservationAction,
  addClosedTaskAction,
  validateQuoteAction,
  acceptDisclosuresAction,
  setDepositRequirementsAction,
  setCorrelationId,
  setFundingAccountToken,
  setDepositCollectionResponse,
  setCreditCheckResult,
  setSubmitOrderResponse,
  setCustomization,
  removeCustomization,
  removeAllCustomizations,
  setCreditForm,
  addProduct
} from './actions';
import { Steps } from '../steps';
import { OffersInterface } from '../services/interfaces/products/offers-interface';

export function FrontierReducer(state, action) {
  return _counterReducer(state, action);
}

export const initialState: Frontier = {
  currentStep: Steps.qualificationStep,
  transactionId: "",
  loading: false,
  error: null,
  success: "",
  addressRequest: null,
  addressSearchResponse: null,
  selectedAddress: null,
  createQuoteRequest: null,
  createQuoteResponse: null,
  quoteId: null,
  offers: [],
  selectedProducts: [],
  customer: null,
  tasks: [],
  quote: {
    items: [],
    quoteId: "",
    dataService: "",
    description: "",
    installationType: "",
    productSummary: null,
    specName: "",
    state: "",
    status: null,
    videoService: "",
    voiceService: "",
  },
  disclosures: [],
  reservation: null,
  closedTasks: [],
  quoteValidated: false,
  wereDisclosuresAccepted: false,
  depositRequirements: null,
  CorrelationId: null,
  fundingAccountToken: null,
  depositCollectionResponse: null,
  creditCheckResult: null,
  order: null,
  selectedCustomizations: [],
  creditForm: null
};

const _counterReducer = createReducer(
  initialState,
  on(addressSearchRequestAction, (state, addressSearchRequest) => ({ ...state, addressSearchRequest, loading: true, error: null })),
  on(addressSearchResponseAction, (state, addressSearchResponse) => ({ ...state, addressSearchResponse, loading: false, error: null })),
  on(setTransactionIdAction, (state, { transactionId }) => ({ ...state, transactionId })),
  on(setSelectedAddressAction, (state, selectedAddress) => ({ ...state, selectedAddress })),
  on(setCreateQuoteRequestAction, (state, createQuoteRequest) => ({ ...state, createQuoteRequest })),
  on(setCreateQuoteResponseAction, (state, createQuoteResponse) => ({ ...state, createQuoteResponse, quoteId: createQuoteResponse.quoteId })),
  on(setStepAction, (state, { step }) => ({ ...state, currentStep: step })),
  on(resetOrderAction, (state) => (initialState)),
  on(setOffersAction, (state, { offers }) => ({ ...state, offers })),
  on(selectProductsAction, (state, { products }) => ({ ...state, selectedProducts: products })),
  on(removeProductAction, (state, { id }) => ({ ...state, selectedProducts: removeProducts(id, state.selectedProducts) })),
  on(setCustomerAction, (state, { customer }) => ({ ...state, customer })),
  on(setTasksAction, (state, { tasks }) => ({ ...state, tasks })),
  on(setQuoteAction, (state, { quote }) => ({ ...state, quote })),
  on(setCustomerForms, (state, { accountForm, identityForm }) => ({ ...state, accountForm, identityForm })),
  on(setDisclosuresAction, (state, { disclosures }) => ({ ...state, disclosures })),
  on(setReservationAction, (state, { reservation }) => ({ ...state, reservation })),
  on(addClosedTaskAction, (state, { taskName }) => ({ ...state, closedTasks: state.closedTasks.concat(taskName) })),
  on(validateQuoteAction, (state) => ({ ...state, quoteValidated: true })),
  on(acceptDisclosuresAction, (state) => ({ ...state, wereDisclosuresAccepted: true })),
  on(setDepositRequirementsAction, (state, { depositRequirements }) => ({ ...state, depositRequirements })),
  on(setCorrelationId, (state, { CorrelationId }) => ({ ...state, CorrelationId })),
  on(setFundingAccountToken, (state, { token }) => ({ ...state, fundingAccountToken: token })),
  on(setDepositCollectionResponse, (state, { depositCollectionResponse }) => ({ ...state, depositCollectionResponse })),
  on(setCreditCheckResult, (state, { creditCheckResult }) => ({ ...state, creditCheckResult })),
  on(setSubmitOrderResponse, (state, { order }) => ({ ...state, order })),
  on(setCustomization, (state, { customization }) => ({ ...state, selectedCustomizations: state.selectedCustomizations.concat(customization) })),
  on(removeCustomization, (state, { customization }) => ({
    ...state,
    selectedCustomizations: state.selectedCustomizations.filter((iterateCustomization) => {
      return iterateCustomization.ID != customization.ID
    })
  })),
  on(removeAllCustomizations, (state) => ({ ...state, selectedCustomizations: [] })),
  on(setCreditForm, (state, { creditForm }) => ({ ...state, creditForm })),
  on(addProduct, (state, { product }) => ({ ...state, selectedProducts: state.selectedProducts.concat(product) })),
);

function removeProducts(productId: string, products: OffersInterface[]) {
  return products.filter((product) => {
    return product.id != productId
  })
}


