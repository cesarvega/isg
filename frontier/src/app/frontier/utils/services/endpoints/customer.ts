const modulePrefix = 'frontier'
const apiVersion = 'v1';
const customer = 'customer';
const creditCheck = 'credit-check/{accountUuid}/{quoteId}';
const numberPortability = 'offers/portability/{quoteId}';

export const getCustomerURL = buildURL(customer);
export const creditCheckURL = buildURL(creditCheck)

export const getNumberPortabiltyURL = (quoteId) => {
  const url = numberPortability.replace("{quoteId}", quoteId);
  return buildURL(url);
}


function buildURL(endpoint) {
  return `${modulePrefix}/${apiVersion}/${endpoint}`
}
