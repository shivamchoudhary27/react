import { getData } from "./../../../adapters/index";

const getUserProfile = () => {
  const query = {
    wsfunction: "core_webservice_get_site_info",  
  };
  getData(query)
    .then((res) => {
      console.log(res); 
      localStorage.setItem('userid', res.data.userid);   
      localStorage.setItem('fullname', res.data.fullname);    
    })
    .catch((err) => {
      console.log(err);
    });
};
// getUserProfile();
//core_enrol_get_users_courses

export { getUserProfile };
