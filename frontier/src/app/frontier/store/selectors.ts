import { AppState } from "src/app/interfaces/app.state";

export const selectAddressSearchRequest = (state: AppState) => state.frontier.addressRequest;
export const selectLoading = (state: AppState) => state.frontier.loading;
export const selectError = (state: AppState) => state.frontier.error;
export const selectUser = (state: AppState) => state.root.user;
export const selectStep = (state: AppState) => state.frontier.currentStep;
export const selectTransactionId = (state: AppState) => state.frontier.transactionId;
export const selectQuoteId = (state: AppState) => state.frontier.quoteId;