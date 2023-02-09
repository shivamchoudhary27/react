import React, { useContext, useEffect, useState } from "react";
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
  const [stateUrl, setStateUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<any>({});
  const currentMethod = window.location.protocol;
  const returnUri = (currentMethod == "https:") ? `${window.location.host}/authlogin` : '127.0.0.1:3000/authlogin';
  const redirectUri = `${currentMethod}//${returnUri}`;
  console.log(redirectUri);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setStateUrl(params.code);
  }, []);

  useEffect(() => {
    if (stateUrl != "") {
      setTimeout(() => {
        let URL = `http://40.114.33.183:8080/oauth2-service/oauth2/api/verifycode?code=${stateUrl}&redirect_uri=${redirectUri}`;
        console.log(URL);
        fetch(URL, {
          method: "GET",
        })
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);

              if (result !== "") {
                Object.entries(result).map(([el, value]: any) => {
                  let tostring = value.toString();
                  sessionStorage.setItem(el, tostring);
                });
              }

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              config.WSTOKEN = config.ADMIN_MOODLE_TOKEN;
              userCtx.setUserToken(config.WSTOKEN);
              navigate("/dashboard");
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      }, 3000);
    }
  }, [stateUrl]);

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
