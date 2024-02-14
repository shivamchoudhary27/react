import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../features/context/user/user";

type Props = {};

const Logout = (props: Props) => {
  const userCtx = useContext(UserContext)
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Navigated to Logout Page");
    console.log(userCtx.token)
    console.log(userCtx.isLoggedIn);
    localStorage.clear();
    navigate("/");
  }, []);

  return <></>;
};

export default Logout;
