import { useContext, useEffect, useState } from 'react';
import { getData } from '../../adapters';
import UserContext from '../context/user/user';
const useUserinfo = () => {
  const userCtx = useContext(UserContext);
  const [triggerEnrolApi, setTriggerEnrolApi] = useState({ status : false, userid : 0});
  const [isLoading, setLoading] = useState(
    userCtx.status === '200' ? 'loaded' : 'loading'
  );
  useEffect(() => {
    if (userCtx.status !== '200') {
      const query = {
        wsfunction: 'local_blapi_get_userinfo'
      };
      getData(query)
        .then(res => {
          if (res.status === 200) {
            if (Object.prototype.hasOwnProperty.call(res.data, 'errorcode')) {
              userCtx.logout();
            } else {
              userCtx.setUserStatus(200);
            }
            res.data.userissiteadmin = res.data.userissiteadmin.toString();
            userCtx.setUserInfo(res.data);
            setTriggerEnrolApi({ status : true, userid : res.data.userid})
          }
          setLoading('loaded');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (triggerEnrolApi.status === true) {
      const query = {
        wsfunction: "core_enrol_get_users_courses",
        userid : triggerEnrolApi.userid,
      };
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data) {
            localStorage.setItem("enroled_courses", JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [triggerEnrolApi]);

  return isLoading === 'loading' ? 'loading' : userCtx;
};
export default useUserinfo;
