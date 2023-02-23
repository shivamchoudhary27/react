import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Loader from "../../widgets/loader/loader";
import { Container } from "react-bootstrap";
// import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import UserContext from "../../features/context/user/user";
import config from "../../utils/config";

const AuthLogin = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentMethod = window.location.protocol;
  const returnUri = (currentMethod == "https:") ? `${window.location.host}/authlogin` : '127.0.0.1:3000/authlogin';
  const redirectUri = `${currentMethod}//${returnUri}`;

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setAuthCode(params.code);
  }, []);

  useEffect(() => {
    if (authCode != "") {

      setTimeout(() => {
        const VERIFY_URL = `${config.OAUTH2_URL}/api/verifycode?code=${authCode}&redirect_uri=${redirectUri}`;
        console.log(VERIFY_URL);
        // verifyCode(VERIFY_URL);

        var requestOptions = {
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
                  // console.log(value)
                  sessionStorage.setItem(key, value);
                });
                config.WSTOKEN = config.ADMIN_MOODLE_TOKEN;
                config.OAUTH2_ACCESS_TOKEN = result.access_token;
                userCtx.setUserToken(config.WSTOKEN);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Login Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/dashboard");         
              }
          }).catch(error => console.log('error', error));
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

const verifyCode = (verifyUrl : string) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: verifyUrl,
    headers: {}
  };

  axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};