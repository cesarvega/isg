import { environment } from 'apps/isgcrm/src/environments/environment';

var api_url = environment.apiURL;
var login = environment.login;

export const SYSTEM_CONFIG = {
    API_URL: api_url,
    LOGIN_PATH: login,
}