import { useContext, useEffect, useState } from 'react';
import { getData } from '../../adapters';
import UserContext from '../context/user/user';

const useUserinfo = () => {
  const userCtx = useContext(UserContext);
  const { userInfo } = userCtx;
  const [isLoading, setLoading] = useState(
    userInfo.status === 200 ? 'loaded' : 'loading',
  );

  useEffect(() => {
    if (userInfo.status !== 200) {
      const query = {
        wsfunction: 'core_webservice_get_site_info',
      };

      getData(query)
        .then((res) => {
          if (res.status === 200) {
            if (Object.prototype.hasOwnProperty.call(res.data, 'errorcode')) {
              userInfo.status = 400;
            } else {
              userInfo.status = 200;
              localStorage.setItem('userid', res.data.userid);
              localStorage.setItem('fullname', res.data.fullname);
              localStorage.setItem('profile', res.data.userpictureurl);
            }
            userInfo.userInfo = res.data;
            userCtx.setUserOn(userInfo);
          }
          setLoading('loaded');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return isLoading === 'loading' ? 'loading' : userCtx;
};

export default useUserinfo;
