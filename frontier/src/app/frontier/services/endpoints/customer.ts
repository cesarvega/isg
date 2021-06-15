const modulePrefix = 'frontier'
const apiVersion = 'v1';
const customer = 'customer';
const creditCheck = 'credit-check/{accountUuid}?quoteId={quoteId}';

export const getCustomerURL = buildURL(customer);
export const creditCheckURL = buildURL(creditCheck);


function buildURL(endpoint) {
  return `${modulePrefix}/${apiVersion}/${endpoint}`
}
