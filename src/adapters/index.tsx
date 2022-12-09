import axios from 'axios';
import config from '../utils/config'; 

const instance = axios.create({
  baseURL: config.MOODLE_BASE_URL,
});

const getPublicData = (requestData : any) => {
  const query = requestData;
  if (query.loginrequest) {
    query.service = 'moodle_mobile_app';
    return instance.get(config.TOKEN_ENDPOINT, { params: query });
  }

  query.wstoken = config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat = 'json';
  return instance.get(config.REST_ENDPOINT, { params: query });
};

const getData = (requestData : any) => {
  const query = requestData;
  query.wstoken = config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat = 'json';
  return instance.get(config.REST_ENDPOINT, { params: query });
};

const postData = (requestData : any) => {
  const query = requestData;
  query.wstoken = config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat = 'json';
  return instance.post(config.REST_ENDPOINT, { params: query });
};
const signupData = (requestData : any) => {
  const query = requestData;
  query.wstoken = config.SIGNUP_TOKEN
  query.moodlewsrestformat = 'json';
  return instance.get(config.REST_ENDPOINT, { params: query });
};

const putData = (requestData : any) => {
  const query = requestData;
  query.wstoken = config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat = 'json';
  return instance.put(config.REST_ENDPOINT, { params: query });
};

const deleteData = (requestData : any) => {
  const query = requestData;
  query.wstoken = config.WSTOKEN ?? localStorage.getItem('token');
  query.moodlewsrestformat = 'json';
  return instance.delete(config.REST_ENDPOINT, { params: query });
};


const processQuizData = (requestData : any) => {
  const query = requestData;
  let paramString = '';
  const wstoken = config.WSTOKEN ?? localStorage.getItem('token');
  paramString += `wsfunction=${query.wsfunction}`;
  paramString += `&wstoken=${wstoken}`;
  paramString += '&moodlewsrestformat=json';
  paramString += `&attemptid=${query.attemptid}`;
  paramString += `&finishattempt=${query.finishattempt}`;
  paramString += `&${query.quizdata}`;

  return instance.get(`${config.REST_ENDPOINT}?${paramString}`);
};

export {
  getPublicData, getData, postData, putData, deleteData, processQuizData,signupData
};
