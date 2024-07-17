// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8001/Axia4', //before qa1
  // apiUrl: 'https://qa2java.axiamfg.com',
  //apiUrl:'https://nodeqa.axiamfg.com/Axia2',
  //apiUrl: 'http://192.168.0.6/AXIA2_Node_Test',  // backend connection for db
  // apiUrl: 'http://192.168.0.6/AXIA2_Node_RND',  // backend connection for db
  // apiUrl: 'https://nodeaxia2.axiamfg.com/Axia2',  // backend connection for db
  // apiUrl: 'https://node.axiamfg.com/Axia2',  // backend connection for db
  redirectUrl: 'http://localhost:4201',   // click sign in button redirect to lucy login
  baseUrl: 'http://localhost:4201',   // sign in - sign up button page redirection
  //baseUrl: localStorage.dynamicUrl || 'http://localhost:4201',   // sign in - sign up button page redirection
  //lucyApiUrl: 'http://192.168.0.6:200/Lucy',
  // lucyApiUrl: 'http://192.168.0.6:200/Lucy_RND',
  // lucyApiUrl : 'https://lucy.axiamfg.com'   // only for signout - in dashboard file (inside lib)
  lucyApiUrl: 'https://javaqa.axiasmart.com',
  // lucyApiUrl: 'https://qa2java.axiasmart.com',
  //  lucyApiUrl: 'https://java.axiamfg.com'   // only for signout - in dashboard file (inside lib)
  // lucyApiUrl: 'http://192.168.0.6:200/Lucy_Internal'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
