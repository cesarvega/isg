import { environment } from 'apps/republicw/src/environments/environment';

var api_url = environment.apiUrl;
var token = environment.token;
var providers = environment.providers;
var classTypes = environment.classTypes;
var products = environment.products;
var serviceLines = environment.service_lines;
var getCustomer = environment.getCustomer;
var putOrder = environment.putOrder;
var register = environment.register;
var dish = environment.dish;
var email = environment.email;
var password = environment.password;
var dni_call = environment.dni_call;
var sales_customer = environment.sales_customer;

export const SYSTEM_CONFIG = {
    API_URL: api_url,
    TOKEN_PATH: token,
    PROVIDERS_PATH: providers,
    CLASSTYPES_PATH: classTypes,
    PRODUCTS_PATH: products,
    SERVICE_LINES_PATH: serviceLines,
    GET_CUSTOMER: getCustomer,
    PUT_ORDER: putOrder,
    REGISTER_PATH: register,
    DISH_PATH: dish,
    EMAIL: email,
    PASSWORD: password,
    DNI_CALL: dni_call,
    SALES_CUSTOMER: sales_customer,
}