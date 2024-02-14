import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../features/context/user/user";

type Props = {};

const Logout = (props: Props) => {
  const userCtx = useContext(UserContext)
  const navigate = useNavigate();
  useEffect(() => {
    userCtx.logout();
    navigate("/");
  }, []);

  return <></>;
};

export default Logout;
