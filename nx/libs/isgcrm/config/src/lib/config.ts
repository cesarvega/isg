import { environment } from 'apps/isgcrm/src/environments/environment';

var api_url = environment.apiURL;
var login = environment.login;
var partners = environment.partners;
var products = environment.products;
var class_types = environment.classTypes;
var features = environment.features;

export const SYSTEM_CONFIG = {
    API_URL: api_url,
    LOGIN_PATH: login,
    PARTNERS_PATH: partners,
    PRODUCTS_PATH: products,
    CLASS_TYPES: class_types,
    FEATURES: features,
}