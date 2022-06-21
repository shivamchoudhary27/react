import  config from'./../utils/config';
import axios  from 'axios';

const instance = axios.create({
   baseURL: config.MOODLE_BASE_URL,  
 });

const getPublicData= (query)=>{
   return instance.get('/login/token.php', {params:query});
}

const getData= (query)=>{
   return instance.get('/webservice/rest/server.php', {params:query});
}

const postData= (query)=>{
   return instance.get('/webservice/rest/server.php', {params:query});
}

const putData= (query)=>{
   return instance.get('/webservice/rest/server.php', {params:query});
}

const deleteData= (query)=>{
   return instance.get('/webservice/rest/server.php', {params:query});
}


export {getPublicData,getData,postData};
