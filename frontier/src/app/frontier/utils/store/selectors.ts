import { AppState } from "src/app/interfaces/app.state";

export const selectAddressSearchRequest = (state: AppState) => state.frontier.addressRequest;
export const selectLoading = (state: AppState) => state.frontier.loading;
export const selectError = (state: AppState) => state.frontier.error;
export const selectUser = (state: AppState) => state.root.user;
export const selectStep = (state: AppState) => state.frontier.currentStep;
export const selectTransactionId = (state: AppState) => state.frontier.transactionId;
export const selectQuoteId = (state: AppState) => state.frontier.quoteId;
export const selectSelectedProducts = (state: AppState) => state.frontier.selectedProducts;
export const selectCustomer = (state: AppState) => state.frontier.customer;
export const selectTasks = (state: AppState) => state.frontier.tasks;
export const selectCloseTasks = (state: AppState) => state.frontier.closedTasks;
export const selectSelectedAddress = (state: AppState) => state.frontier.selectedAddress;
export const selectQuote = (state: AppState) => state.frontier.quote;
export const selectFrontier = (state: AppState) => state.frontier;
export const selectWasQuoteValidated = (state: AppState) => state.frontier.quoteValidated;
export const selectWereDisclosuresAccepted = (state: AppState) => state.frontier.wereDisclosuresAccepted;
export const selectDepositRequirements = (state: AppState) => state.frontier.depositRequirements;
export const selectOffers = (state: AppState) => state.frontier.offers;
export const selectCorrelationId = (state: AppState) => state.frontier.CorrelationId;
export const selectFundingAccountToken = (state: AppState) => state.frontier.fundingAccountToken;
export const selectDepositCollectionResponse = (state: AppState) => state.frontier.depositCollectionResponse;
export const selectCustomerCreditCheckResult = (state: AppState) => state.frontier.creditCheckResult;
export const selectAccountForm = (state: AppState) => state.frontier.accountForm;
export const selectSelectedAddressValues = (state: AppState) => state.frontier.selectedAddress.address;

