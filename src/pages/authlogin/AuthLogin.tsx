import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
// import https from 'https';
import Loader from "../../widgets/loader/loader";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import UserContext from "../../features/context/user/user";
import config from "../../utils/config";
import { createAxiosInstance } from "../../adapters/microservices/utils";

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
        
        axios.defaults.baseURL = `${config.OAUTH2_URL}`;
        console.log('axios default baseurl ' + axios.defaults.baseURL);
        
        // const httpsAgent = new https.Agent({
        //   rejectUnauthorized: false
        // });

        // axios.get(VERIFY_URL, {
        //   // httpsAgent
        // })
        axios({
          method: 'get',
          baseURL: VERIFY_URL,
        })
        .then(result => {
          setIsLoaded(true);

            if (result.data !== '' && 'access_token' in result.data) {
              Object.entries(result.data).map(([key, value]: any) => {
                value = value.toString();
                sessionStorage.setItem(key, value);
                localStorage.setItem(key, value);  // added if app if reloaded for some url
              });

              createAxiosInstance(result.data.access_token);
              config.WSTOKEN = config.ADMIN_MOODLE_TOKEN;
              config.OAUTH2_ACCESS_TOKEN = result.data.access_token;               
              
              userCtx.setUserToken(config.WSTOKEN);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/dashboard");         
            } else {
              window.alert('Failed to get auth token');
            }
        })
        .catch(error => {
          console.log(error);
          // Handle error response here
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
    <>
      <Container style={loaderStyle}>
        <div>
          {(error && <div>{error}</div>) ||
            (!isLoaded && (
              <div>
                <Loader />
                <p>Authentication in progresss ...</p>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

export default AuthLogin;

