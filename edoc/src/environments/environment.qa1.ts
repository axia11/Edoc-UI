export const environment = {
  production: true,
  apiUrl: 'https://nodeedocqa.edocx.ai/edoc', // backend connection for db
  redirectUrl: 'https://qaaccounts.blunetworld.org/', // click sign in button redirect to lucy login
  baseUrl: localStorage.dynamicUrl || '', // sign in - sign up button page redirection
  lucyApiUrl: 'https://javaqa.edocx.ai/Lucy' // only for signout - in dashboard file (inside lib)
};
