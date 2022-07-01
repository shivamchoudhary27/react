import React, { useContext } from "react";
import { getData } from "./../../../adapters/index";
import UserContext from "../../context/user/user";

const useGetUserProfile = (fireCall = false) => {
  const ctx = useContext(UserContext);
  console.log('in the context' + fireCall);

  if (fireCall === true) {
    console.log('request is true');
    const wstoken = localStorage.getItem("token");
    const query = {
      wsfunction: "core_webservice_get_site_info",
      serviceshortnames: ["moodle_mobile_app"],
      wstoken: wstoken,
      moodlewsrestformat: "json",
      
    };
    let x = getData(query).then((res) => {
        console.log(res); 
        // ctx.setUserOn(res.data);
        localStorage.setItem('userid', res.data.userid);   
        localStorage.setItem('fullname', res.data.fullname);  
        localStorage.setItem('profile', res.data.userpictureurl);  
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  
      return x;
  }
  return null;
};
// getUserProfile();
//core_enrol_get_users_courses

export default useGetUserProfile;
