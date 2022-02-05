// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  itemEndpoint: 'https://procurement-system.herokuapp.com/items',
  purchaseRequestEndpoint: 'https://procurement-system.herokuapp.com/requests',
  purchaseOrderEndpoint: 'https://procurement-system.herokuapp.com/orders',
  supplierEndpoint: 'https://procurement-system.herokuapp.com/suppliers',
  grnEndpoint: 'https://procurement-system.herokuapp.com/Grn',
  payGrnEndpoint: 'https://procurement-system.herokuapp.com/Grn/pay',
  approvePurchaseRequestsEndpoint: 'https://procurement-system.herokuapp.com/requests/approve',
  loginUrl: 'https://procurement-system.herokuapp.com/login',
  registerUrl: 'https://procurement-system.herokuapp.com/users/signup',
  listUrl: 'https://procurement-system.herokuapp.com/users/list',
  updateUrl: 'https://procurement-system.herokuapp.com/users/update/',
  deleteUrl: 'https://procurement-system.herokuapp.com/users/deactivate',
  detailsUrl: 'https://procurement-system.herokuapp.com/users/details/',
  forgotUrl: 'https://procurement-system.herokuapp.com/users/forgotpassword/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
