import React from "react";
import config from "../../../utils/config";
import { string } from "yup";
import axios from 'axios';

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
  userInfo: {fullname: string, userid: string, userpictureurl: string, userissiteadmin: string},
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
  userissiteadmin: localStorage.getItem("userissiteadmin")
    ? localStorage.getItem("userissiteadmin")
    : 'false',
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
    UserInfoData.userid && UserInfoData.fullname && UserInfoData.userpictureurl && UserInfoData.userissiteadmin
      ? UserInfoData
      : UserInfoData
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
    localStorage.setItem("userissiteadmin", data.userissiteadmin);
  };
  // logout handler
  const logoutHandler = () => {

    const LOGOUT_URL = `${config.OAUTH2_URL}/logout`;

    var requestOptions: any = {
      method: 'GET',
      redirect: 'follow'
    };
  
    axios.get(LOGOUT_URL, requestOptions)
    .then((response: any) => {
      console.log(response)
    })

    // setToken(null);
    // setStatus(0);
    // setUserInfo(null);
    // config.WSTOKEN = '';
    // localStorage.removeItem("token");
    // localStorage.removeItem("loggedIn");
    // localStorage.removeItem("fullname");
    // localStorage.removeItem("userid");
    // localStorage.removeItem("name");
    // localStorage.removeItem("userpictureurl");
    // localStorage.removeItem("userissiteadmin");
    // localStorage.removeItem("enroled_courses");
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
