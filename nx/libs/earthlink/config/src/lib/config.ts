/*
    switch API route based on environment: production /development
*/
import { environment } from 'apps/earthlink/src/environments/environment';

var api_url = environment.apiURL;
var qualify = environment.qualify;
var transaction = environment.transaction;
var login = environment.login;
var payment = environment.payment;
var account = environment.account;

export const SYSTEM_CONFIG = {
    API_URL: api_url,
    qualify: qualify,
    transaction: transaction,
    login: login,
    payment: payment,
    account: account
}