const modulePrefix = 'frontier'
const apiVersion = 'v1';
const getOffers = 'offers';
const addProduct = 'products';
const updateProduct = 'products/{quoteId}/{quoteItemId}';

export const getOffersURL = buildURL(getOffers);
export const addProductURL = buildURL(addProduct);


function buildURL(endpoint) {
  return `${modulePrefix}/${apiVersion}/${endpoint}`
}

export const getUpdateProductURL = (quoteId, quoteItemId) => {
  let url = buildURL(updateProduct)
  url = url.replace("{quoteId}", quoteId);
  url = url.replace("{quoteItemId}", quoteItemId);
  return url
}
