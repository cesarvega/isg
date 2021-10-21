//to do
/*
    switch API route based on environment: prod/dev
*/
var api_url='http://localhost:8000/';//https://isg-br-webdev/wc/carlos/earthlink-api
// switch( env.NODE_ENV){
//     case 'development':
//         api_url = 'http://localhost:8000';
//         break;
//     case 'production':
//         api_url = '';
//         break;
// }
export const SYSTEM_CONFIG = {
    API_URL: api_url,
}