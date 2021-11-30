// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://aws-dev-01.isg.us/api',
  token: '/token',
  providers: '/republic/providers/filter',
  classTypes: '/republic/class_types/filter',
  products: '/republic/products/filter',
  service_lines: '/republic/config/service_lines',
  getCustomer: '/republic/customers/filter',
  putOrder: '/republic/orders',
  register: '/republic/customers',
  dish: '/republic/config/republic_wireless_url',
  email: 'admin@isg.us',
  password: 'admin@isg',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
