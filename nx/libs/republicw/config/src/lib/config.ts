import { environment } from 'apps/republicw/src/environments/environment';

var api_url = environment.apiUrl;
var token = environment.token;
var providers = environment.providers;
var classTypes = environment.classTypes;
var products = environment.products;

export const SYSTEM_CONFIG = {
    API_URL: api_url,
    LOGIN_PATH: token,
    PROVIDERS_PATH: providers,
    CLASSTYPES_PATH: classTypes,
    PRODUCTS_PATH: products,
}