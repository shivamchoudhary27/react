import React from "react";
import config from "../../../utils/config";

/**
 * Initializing ContextApi with requried fields.
 * @field userAuth
 * @field userInfo
 * @field login with data as param
 * @field logout
 */
const UserContext = React.createContext({
  status: "",
  token: "",
  isLoggedIn: false,
  userInfo: {},
  setUserStatus: () => {},
  logout: () => {},
  setUserToken: () => {},
  setUserInfo: () => {},
});

const UserInfoData = {
  userid: localStorage.getItem("userid")
    ? localStorage.getItem("userid")
    : null,
  fullname: localStorage.getItem("fullname")
    ? localStorage.getItem("fullname")
    : null,
  userpictureurl: localStorage.getItem("userpictureurl")
    ? localStorage.getItem("userpictureurl")
    : null,
};

/**
 * UserContextProvide: Arrow function for UserContext
 * @param props
 */
export const UserContextProvider = (props) => {
  const [token, setToken] = React.useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [userInfo, setUserInfo] = React.useState(
    UserInfoData.userid && UserInfoData.fullname && UserInfoData.userpictureurl
      ? UserInfoData
      : null
  );
  const [status, setStatus] = React.useState(null);

  // set User logged in detail (boolean)
  const userLoggedIn = !!token;

  // set User status
  const setUserStatus = (data) => {
    setStatus(data);
  };

  // set User info
  const setPersonalInfo = (data) => {
    setUserInfo(data);
    localStorage.setItem("userid", data.userid);
    localStorage.setItem("fullname", data.fullname);
    localStorage.setItem("userpictureurl", data.userpictureurl);
  };

  // logout handler
  const logoutHandler = () => {
    setToken(null);
    setStatus(null);
    setUserInfo(null);
    config.WSTOKEN = null;
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("fullname");
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem("userpictureurl");
  };

  // Initializing token
  const setUserToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("loggedIn", !!token);
    setToken(token);
  };

  // context values
  const contextValues = {
    status: status,
    token: token,
    userInfo: userInfo,
    isLoggedIn: userLoggedIn,
    setUserStatus: setUserStatus,
    logout: logoutHandler,
    setUserToken: setUserToken,
    setUserInfo: setPersonalInfo,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
