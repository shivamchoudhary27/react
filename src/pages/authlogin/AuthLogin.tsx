import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../features/context/user/user";
import config from "../../utils/config";
import { createAxiosInstance } from "../../adapters/microservices/utils";
import { createCoreAxiosInstance } from "../../adapters/coreservices/utils";
import NewLoader from "../../widgets/loader";
import { useDispatch } from "react-redux";
import { globalAlertActions } from "../../store/slices/globalAlerts";
import { userAuthoritiesActions } from "../../store/slices/userRoles";
import { getData } from "../../adapters/coreservices";

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
      
      setTimeout(() => {
        const VERIFY_URL = `${config.OAUTH2_URL}/api/verifycode?code=${authCode}&redirect_uri=${redirectUri}`;
        console.log('VERIFY_URL', VERIFY_URL);

        var requestOptions: any = {
          method: 'GET',
          redirect: 'follow'
        };
      
        fetch(VERIFY_URL, requestOptions)
          .then(response => response.json())
          .then((result) => {
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

                /*
                 * hit api here for collecting user roles and permission data
                 * replace this packet with user-role api and with autority packet
                 */

                getData('/user-info', {}).then((res: any)=>{
                  if(res.data !== "" && res.status === 200){
                    // console.log("role-----", res.data.authorities[1])
                    res.data.authorities[1] !== undefined && dispatch(userAuthoritiesActions.updateUserAuthorities(res.data.authorities[1]));
                    res.data.authorities[1] !== undefined && localStorage.setItem('userAuthorities', JSON.stringify(res.data.authorities[1]));
                    // res.data.roles[1] !== undefined && localStorage.setItem('roles', JSON.stringify(res.data.roles[1]));
                  }
                  // navigate("/studentdashboard");  
                  // console.log(res.data)       
                })

                // const currentUserPermissions = [
                //   "view course",
                //   "Create groups",
                //   "View groups",
                //   "update course",
                //   "delete course",
                //   "create course",
                //   "VIEW_PROGRAM",
                //   "CREATE_PROGRAM",
                //   "UPDATE_PROGRAM",
                //   "DELETE_PROGRAM",
                //   "VIEW_USER",
                //   "UPDATE_USER",
                //   "DELETE_USER",
                // ];

                // dispatch(userAuthoritiesActions.updateUserAuthorities(currentUserPermissions));
                // localStorage.setItem('userAuthorities', JSON.stringify(currentUserPermissions));

                /*
                 * end user role handling
                 */

                // Swal.fire({
                //   position: "center",
                //   icon: "success",
                //   title: "Login Successful",
                //   showConfirmButton: false,
                //   timer: 1500,
                // });

                navigate("/studentdashboard");         
              } else {
                dispatch(globalAlertActions.globalAlert({alertMsg: "Failed to get auth token", status : true}))
              }
          }).catch((error) => {
            console.error(error);
          });
      }, 2000);
    }
  }, [authCode]);

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
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

