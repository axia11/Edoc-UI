export const environment = {
  production: true,
  apiUrl: 'https://node.edocx.ai/Axia4', // backend connection for db
  redirectUrl: 'https://accounts.blunetworld.org/', // click sign in button redirect to lucy login
  baseUrl: localStorage.dynamicUrl || '', // sign in - sign up button page redirection
  lucyApiUrl: 'https://java.edocx.ai' // only for signout - in dashboard file (inside lib)
};
