import  config from'./../utils/config';
import axios  from 'axios';

const instance = axios.create({
   baseURL: config.MOODLE_BASE_URL,
 });

const getPublicData= (query)=>{

   return instance.get('/login/token.php', {params:query});
}

const getData= (query)=>{
   
   return instance.get(config.REST_ENDPOINT, {params:query});
}

const postData= (query)=>{
   return instance.post(config.REST_ENDPOINT, {params:query});
}

const putData= (query)=>{
   return instance.put(config.REST_ENDPOINT, {params:query});
}

const deleteData= (query)=>{
   return instance.delete(config.REST_ENDPOINT, {params:query});
}


export {getPublicData,getData,postData, putData,deleteData};
