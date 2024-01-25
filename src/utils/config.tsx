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