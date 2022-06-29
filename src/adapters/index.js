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
    console.log(config);
    query.serviceshortnames =  ["moodle_mobile_app"];
    query.wstoken= localStorage.getItem('token');
    query.moodlewsrestformat= "json";
    return instance.get(config.REST_ENDPOINT, { params: query });
  }
  
};

const getData = (query) => {
 
  query.serviceshortnames =  ["moodle_mobile_app"];
  query.wstoken= localStorage.getItem('token');
  query.moodlewsrestformat= "json";
  return instance.get(config.REST_ENDPOINT, { params: query });
};

const postData = (query) => {
  return instance.post(config.REST_ENDPOINT, { params: query });
};

const putData = (query) => {
  return instance.put(config.REST_ENDPOINT, { params: query });
};

const deleteData = (query) => {
  return instance.delete(config.REST_ENDPOINT, { params: query });
};

export { getPublicData, getData, postData, putData, deleteData };
