// const API_URL =  'https://api.microlearning.ballisticlearning.com';

// const config = {
//   APP_NAME: 'BL Mircolearning',
//   MOODLE_BASE_URL: 'https://demo.learn.ballisticlearning.com',
//   REST_ENDPOINT: '/webservice/blrest/server.php',
//   TOKEN_ENDPOINT: '/login/token.php',
//   OAUTH2_URL: API_URL + ':8443/oauth2-service/oauth2',
//   JAVA_API_URL: API_URL + '/learning-service/api/v1',
//   CORE_SERVICE_URL: API_URL + ':8081/core-service/api/v1',
//   WSTOKEN: '',
//   SIGNUP_TOKEN: '8d03740114d7a608cd93b89bb2b726f9',  //dummy token of admin to signup user moodle api
//   ADMIN_MOODLE_TOKEN: 'c1bd1822d7c4609a5e259cb897fe77ea',  //dummy token of moodle admin
//   OAUTH2_ACCESS_TOKEN: '',
//   REDIRECT_URI : `${window.location.protocol}//${window.location.host}/authlogin`
// };

// export default config;

const API_URL =  process.env.REACT_API_URL;

const config = {
  APP_NAME: process.env.REACT_APP_NAME,
  MOODLE_BASE_URL: process.env.REACT_APP_MOODLE_BASE_URL,
  REST_ENDPOINT: process.env.REACT_APP_REST_ENDPOINT,
  TOKEN_ENDPOINT: process.env.REACT_APP_TOKEN_ENDPOINT,
  OAUTH2_URL: process.env.REACT_APP_OAUTH2_URL,
  JAVA_API_URL: process.env.REACT_APP_JAVA_API_URL,
  CORE_SERVICE_URL: process.env.REACT_APP_CORE_SERVICE_URL,
  WSTOKEN: process.env.REACT_APP_WSTOKEN,
  SIGNUP_TOKEN: process.env.REACT_APP_SIGNUP_TOKEN,  //dummy token of admin to signup user moodle api
  ADMIN_MOODLE_TOKEN: process.env.REACT_APP_ADMIN_MOODLE_TOKEN,  //dummy token of moodle admin
  OAUTH2_ACCESS_TOKEN: process.env.REACT_APP_OAUTH2_ACCESS_TOKEN,
  REDIRECT_URI : `${window.location.protocol}//${window.location.host}/authlogin`
};

export default config;