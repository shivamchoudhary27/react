import axios from 'axios';
import config from "../../utils/config";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import NewLoader from "../../widgets/loader";
import { useNavigate } from "react-router-dom";
import { getData } from "../../adapters/coreservices";
import UserContext from "../../features/context/user/user";
import React, { useContext, useEffect, useState } from "react";
import { globalAlertActions } from "../../store/slices/globalAlerts";
import { userAuthoritiesActions } from "../../store/slices/userRoles";
import { createAxiosInstance } from "../../adapters/microservices/utils";
import { createCoreAxiosInstance } from "../../adapters/coreservices/utils";
import { globalUserInfoActions } from "../../store/slices/userInfo";

const AuthLogin = () => {
  const error = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [authCode, setAuthCode] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const redirectUri = config.REDIRECT_URI;

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setAuthCode(params.code);
  }, []); 

  useEffect(() => {
    if (authCode !== "") {
        const VERIFY_URL = `${config.OAUTH2_URL}/api/verifycode?code=${authCode}&redirect_uri=${redirectUri}`;
        console.log('VERIFY_URL', VERIFY_URL);

        var requestOptions: any = {
          method: 'GET',
          redirect: 'follow'
        };
      
        axios.get(VERIFY_URL, requestOptions)
        .then((response) => {
          if (response.data === '') {
            console.log('please authentication failed/expired login again');
            dispatch(globalAlertActions.globalAlert({alertMsg: "Authentication failes", status : true}))
            navigate('/');
          } else {
              let result = response.data;
              setIsLoaded(true);
              if ('access_token' in result) {
                Object.entries(result).map(([key, value]: any) => {
                  value = value.toString();
                  sessionStorage.setItem(key, value);
                  localStorage.setItem(key, value);  // added if app if reloaded for some url
                });

                createAxiosInstance(result.access_token);
                createCoreAxiosInstance(result.access_token);
                // config.WSTOKEN = config.ADMIN_MOODLE_TOKEN;
                config.WSTOKEN = result.access_token;
                config.OAUTH2_ACCESS_TOKEN = result.access_token;               
                
                userCtx.setUserToken(config.WSTOKEN);

                getData('/user-info', {}).then((res: any)=>{
                  if(res.data !== "" && res.status === 200){
                    console.log(res)
                    res.data.authorities[1] !== undefined && dispatch(userAuthoritiesActions.updateUserAuthorities(res.data.authorities[1]));
                    res.data.authorities[1] !== undefined && localStorage.setItem('userAuthorities', JSON.stringify(res.data.authorities[1]));
                    res.data !== "" && dispatch(globalUserInfoActions.userInfo(res.data));
                    res.data !== "" && localStorage.setItem('userInfo', JSON.stringify({userInfo: res.data}))
                    res.data.roles[1] !== undefined && localStorage.setItem('roles', JSON.stringify(res.data.roles[1]));
                    setTimeout(()=>{
                      navigate("/dashboard");
                    }, 500);
                  }
                })
      
              } else {
                dispatch(globalAlertActions.globalAlert({alertMsg: "Authentication failed", status : true}));
                navigate('/');
              }
          }
          // Handle the response here
          console.log('axios response success', response);
        })
        .catch(error => {
          // Handle errors here
          console.error('axios response eeor', error);
        });
    }
  }, [authCode]);

  const loaderStyle = {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <React.Fragment>
      <Container style={loaderStyle}>
        <div>
          {(error && <div>{error}</div>) ||
            (!isLoaded && (
              <div>
                <NewLoader />
              </div>
            ))}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default AuthLogin;

