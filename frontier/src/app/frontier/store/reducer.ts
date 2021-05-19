import { createReducer, on } from '@ngrx/store';
import { Frontier } from '../interfaces/app.state';
import { addressSearchRequestAction, addressSearchResponseAction, setErrorAction, setTransactionIdAction, setSelectedAddressAction, setCreateQuoteRequestAction, setCreateQuoteResponseAction, setStepAction, resetOrderAction, setOffersAction } from './actions';
import { ErrorInterface } from '../interfaces/error-interface';
import { Steps } from '../utils/steps';



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
  offers: null

};

const _counterReducer = createReducer(
  initialState,
  on(addressSearchRequestAction, (state, addressSearchRequest) => ({ ...state, addressSearchRequest, loading: true, error: null })),
  on(addressSearchResponseAction, (state, addressSearchResponse) => ({ ...state, addressSearchResponse, loading: false, error: null })),
  on(setErrorAction, (state, error) => ({ ...state, loading: false, error: parseHttperror(error) })),
  on(setTransactionIdAction, (state, { transactionId }) => ({ ...state, transactionId })),
  on(setSelectedAddressAction, (state, selectedAddress) => ({ ...state, selectedAddress })),
  on(setCreateQuoteRequestAction, (state, createQuoteRequest) => ({ ...state, createQuoteRequest })),
  on(setCreateQuoteResponseAction, (state, createQuoteResponse) => ({ ...state, createQuoteResponse, quoteId: createQuoteResponse.quoteId })),
  on(setStepAction, (state, { step }) => ({ ...state, currentStep: step })),
  on(resetOrderAction, (state) => (initialState)),
  on(setOffersAction, (state, offers) => ({ ...state, offers })),
);
export function FrontierReducer(state, action) {
  return _counterReducer(state, action);
}

function parseHttperror(error) {
  if (error.status == 422) {
    let parsedError = error.error;
    if (parsedError.errors) {
      let fixedErrors = Object.values(parsedError.errors);
      fixedErrors = fixedErrors.map((error) => {
        return error[0]
      })
      let errorInterface: ErrorInterface = {
        errors: fixedErrors,
        message: parsedError.message
      }
      return errorInterface;
    }
  }
  else {
    return { message: error.message, errors: [] }
  }
}


