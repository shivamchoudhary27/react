import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../features/context/user/user";
import config from "../../utils/config";
import { createAxiosInstance } from "../../adapters/microservices/utils";
import NewLoader from "../../widgets/loader";

const AuthLogin = () => {
  const error = null;
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
        console.log(VERIFY_URL);

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
                // config.WSTOKEN = config.ADMIN_MOODLE_TOKEN;
                config.WSTOKEN = result.access_token;
                config.OAUTH2_ACCESS_TOKEN = result.access_token;               
                
                userCtx.setUserToken(config.WSTOKEN);
                // Swal.fire({
                //   position: "center",
                //   icon: "success",
                //   title: "Login Successful",
                //   showConfirmButton: false,
                //   timer: 1500,
                // });
                navigate("/studentdashboard");         
              } else {
                window.alert('Failed to get auth token');
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

