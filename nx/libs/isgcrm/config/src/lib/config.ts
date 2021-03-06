import { environment } from 'apps/isgcrm/src/environments/environment';

var api_url = environment.apiUrl;
var token = environment.token;
var partners = environment.partners;
var catalogByProvider = environment.catalogByProvider;
var catalog = environment.catalog;
var class_types = environment.classTypes;
var features = environment.features;
var token_header_key = environment.token_header_key;

export const SYSTEM_CONFIG = {
    TOKEN_HEADER_KEY: token_header_key,
    API_URL: api_url,
    TOKEN_PATH: token,
    PARTNERS_PATH: partners,
    CATALOG_BY_PROVIDER: catalogByProvider,
    CATALOG: catalog,
    CLASS_TYPES: class_types,
    FEATURES: features,
}