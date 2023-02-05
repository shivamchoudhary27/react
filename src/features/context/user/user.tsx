import React from "react";
import config from "../../../utils/config";
// import { ContextType } from '../../../type/index';
import { string } from "yup";

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
  userInfo: {fullname: string, userid: string, userpictureurl: string, userissiteadmin: false},
  role: "",
  setUserStatus: (status: number) => {},
  logout: () => {},
  setUserToken: (token: any) => {},
  setUserInfo: (data: any) => {}
});
const UserInfoData = {
  userid: localStorage.getItem("userid")
    ? localStorage.getItem("userid")
    : null,
  fullname: localStorage.getItem("fullname")
    ? localStorage.getItem("fullname")
    : null,
  userrole: localStorage.getItem("userrole")
    ? localStorage.getItem("userrole")
    : null,
  userpictureurl: localStorage.getItem("userpictureurl")
    ? localStorage.getItem("userpictureurl")
    : null
};
/**
 * UserContextProvide: Arrow function for UserContext
 * @param props
 */
export const UserContextProvider = (props: { children: any}) => {
  const [token, setToken] = React.useState<any>(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [userInfo, setUserInfo] = React.useState<any>(
    UserInfoData.userid && UserInfoData.fullname && UserInfoData.userpictureurl && UserInfoData.userrole
      ? UserInfoData
      : null
  );
  const [status, setStatus] = React.useState<number>(0);
  // set User logged in detail (boolean)
  const userLoggedIn = !!token;

  const setUserStatus = (data : number) => {
    setStatus(data);
  };

  // set User info
  const setPersonalInfo = (data: any) => {
    setUserInfo(data);
    localStorage.setItem("userid", data.userid);
    localStorage.setItem("fullname", data.fullname);
    localStorage.setItem("userpictureurl", data.userpictureurl);
    localStorage.setItem("userrole", data.userissiteadmin);
  };
  // logout handler
  const logoutHandler = () => {
    setToken(null);
    setStatus(0);
    setUserInfo(null);
    config.WSTOKEN = null;
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("fullname");
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem("userpictureurl");
    localStorage.removeItem("userrole");
  };
  // Initializing token
  const setUserToken = (token: any) => {
    let loggedInStatus = (!!token === true) ? 'true' : 'false';
    localStorage.setItem("token", token);
    localStorage.setItem("loggedIn", loggedInStatus);
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
    setUserInfo: setPersonalInfo
  };
  return (
    <UserContext.Provider value={contextValues}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
