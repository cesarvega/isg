const modulePrefix = 'frontier'
const apiVersion = 'v1';
const addressSearchPredictive = 'quote/find-address-predictive';
const addressSearchExhaustive = 'quote/find-address-exhaustive';
const generateTransactionId = 'transaction/generate';
const createQuote = 'quote/create';
const getOffers = 'offers';

export const addressPredictiveSearchURL = `${modulePrefix}/${apiVersion}/${addressSearchPredictive}`;
export const addressExhaustiveSearchURL = `${modulePrefix}/${apiVersion}/${addressSearchExhaustive}`;
export const generateTransactionIdURL = `${modulePrefix}/${apiVersion}/${generateTransactionId}`;
export const createQuoteURL = `${modulePrefix}/${apiVersion}/${createQuote}`;
export const getOffersURL = `${modulePrefix}/${apiVersion}/${getOffers}`;