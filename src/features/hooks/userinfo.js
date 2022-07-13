import { useContext, useEffect } from "react";
import { getData } from "../../adapters";
import UserContext from "../context/user/user";

const useUserinfo = () => {

  const userCtx = useContext(UserContext);

  useEffect(() => {
    const query = {
      wsfunction: "core_webservice_get_site_info",
    };

    getData(query)
      .then((res) => {
        localStorage.setItem("userid", res.data.userid);
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("profile", res.data.userpictureurl);
        userCtx.setUserOn(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return userCtx;
}

export default useUserinfo;