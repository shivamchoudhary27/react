const config = {
  APP_NAME: 'BL Mircolearning',
  MOODLE_BASE_URL: 'https://demo.learn.ballisticlearning.com',
  REST_ENDPOINT: '/webservice/rest/server.php',
  TOKEN_ENDPOINT: '/login/token.php',
  OAUTH2_URL: 'http://40.114.33.183:8080/oauth2-service/oauth2',
  JAVA_API_URL: 'http://40.114.33.183:8081/learning-service/api/v1',
  WSTOKEN: '',
  SIGNUP_TOKEN: '8d03740114d7a608cd93b89bb2b726f9',  //dummy token of admin to signup user moodle api
  ADMIN_MOODLE_TOKEN: 'bf6d98415a7b551c4ee9b6e20167dac3',  //dummy token of moodle admin
  OAUTH2_ACCESS_TOKEN: '',
  REDIRECT_URI : `${window.location.protocol}//${window.location.host}/authlogin`
};

export default config;