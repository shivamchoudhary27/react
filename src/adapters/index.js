import  config from'./../utils/config';
import axios  from 'axios';

const instance = axios.create({
   baseURL: config.MOODLE_BASE_URL,  
 });

const getPublicData= (query)=>{
   return instance.get('/login/token.php', {params:query});
}



export default getPublicData;
