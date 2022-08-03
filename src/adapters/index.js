import config from "./../utils/config";
import axios from "axios";

const instance = axios.create({
  baseURL: config.MOODLE_BASE_URL,
});

const getPublicData = (query) => {

  if(query.loginrequest){
    query.service=  "moodle_mobile_app";
    return instance.get(config.TOKEN_ENDPOINT, { params: query });
  }else{
   
    // query.serviceshortnames =  ["moodle_mobile_app"];
    query.wstoken= config.WSTOKEN ?? localStorage.getItem('token');
    query.moodlewsrestformat= "json";
    return instance.get(config.REST_ENDPOINT, { params: query }); 
  }
  
};

const getData = (query) => {
 
  // query.serviceshortnames =  ["moodle_mobile_app"];
  query.wstoken= config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat= "json";
  return instance.get(config.REST_ENDPOINT, { params: query });
};

const postData = (query) => {
  // query.serviceshortnames =  ["moodle_mobile_app"];
  query.wstoken= config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat= "json";
  return instance.post(config.REST_ENDPOINT, { params: query });
};

const putData = (query) => {
  // query.serviceshortnames =  ["moodle_mobile_app"];
  query.wstoken= config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat= "json";
  return instance.put(config.REST_ENDPOINT, { params: query });
};

const deleteData = (query) => {
  // query.serviceshortnames =  ["moodle_mobile_app"];
  query.wstoken= config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat= "json";
  return instance.delete(config.REST_ENDPOINT, { params: query });
};

const processQuizData = (query) => {
  let paramString = '';
  let wstoken= config.WSTOKEN ?? localStorage.getItem('token');
  paramString += "wsfunction=" + query.wsfunction;
  paramString += "&wstoken=" + wstoken;
  paramString += "&moodlewsrestformat=json";
  paramString += "&attemptid=" + query.attemptid;
  paramString += "&finishattempt=" + query.finishattempt;
  paramString += "&" + query.quizdata;

  return instance.get(config.REST_ENDPOINT + "?" + paramString);
}

export { getPublicData, getData, postData, putData, deleteData, processQuizData };
