import { useContext, useEffect, useState } from 'react';
import { getData } from '../../adapters';
import UserContext from '../context/user/user';

const useUserinfo = () => {
  const userCtx = useContext(UserContext);
  const [isLoading, setLoading] = useState(
    userCtx.status === 200 ? 'loaded' : 'loading',
  );

  useEffect(() => {
    if (userCtx.status !== 200) {
      const query = {
        wsfunction: 'core_webservice_get_site_info',
      };

      getData(query)
        .then((res) => {
          if (res.status === 200) {
            if (Object.prototype.hasOwnProperty.call(res.data, 'errorcode')) {
              userCtx.logout();
            } else {
              userCtx.setUserStatus(200);
            }
            userCtx.setUserInfo(res.data);
          }
          setLoading('loaded');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return isLoading === "loading" ? "loading" : userCtx;
};

export default useUserinfo;
