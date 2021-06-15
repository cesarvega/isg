const modulePrefix = 'frontier'
const apiVersion = 'v1';
const addressSearchPredictive = 'quote/find-address-predictive';
const addressSearchExhaustive = 'quote/find-address-exhaustive';
const generateTransactionId = 'transaction/generate';
const createQuote = 'quote/create';
const validateQuote = 'quote/validation/{quoteId}';
const completeTask = 'tasks/complete/{transactionId}?quoteId={quoteId}';
const getQuote = 'quote/{quoteId}';

export const addressPredictiveSearchURL = buildURL(addressSearchPredictive);
export const addressExhaustiveSearchURL = buildURL(addressSearchExhaustive);
export const generateTransactionIdURL = buildURL(generateTransactionId);
export const createQuoteURL = buildURL(createQuote);
export const validateQuoteURL = buildURL(validateQuote);
export const getQuoteURL = buildURL(getQuote);



export const getCompleteTaskURL = (transactionId, quoteId) => {
  let url = buildURL(completeTask);
  url = url.replace("{transactionId}", transactionId)
  url = url.replace("{quoteId}", quoteId)
  return url;
}

export const getValidateQuoteURL = (quoteId) => {
  let url = buildURL(validateQuote);
  url = url.replace("{quoteId}", quoteId)
  return url;
}


function buildURL(endpoint) {
  return `${modulePrefix}/${apiVersion}/${endpoint}`
}
