import React, { useEffect, useState } from "react";
import Loader from "../../widgets/loader/loader";
import { Container } from "react-bootstrap";
// import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [stateUrl, setStateUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<any>({});
  const redirectUrl = "http://127.0.0.1:3000/authlogin";

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setStateUrl(params.code);
  }, []);

  useEffect(() => {
    if (stateUrl != "") {
      setTimeout(() => {
        let URL =
          "http://40.114.33.183:8080/oauth2/code/verify?code=" +
          stateUrl +
          "&redirect_url=" +
          redirectUrl;

        fetch(URL, {
          method: "GET",
        })
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Authentication Successful",
                showConfirmButton: false,
                timer: 1500,
              });
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      }, 3000);
    }
  }, [stateUrl]);

  if (items !== "") {
    Object.entries(items).map(([el, value]: any) => {
      let tostring = value.toString();
      sessionStorage.setItem(el, tostring);
      navigate("/login");
    });
  }

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
