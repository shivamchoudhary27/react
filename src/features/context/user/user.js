import React, { useState } from "react";

const UserContext = React.createContext({});

export default UserContext;


export const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({testProp: 'React js'});

  const setUser = (data) => {
    setUserInfo(data);
  };

  const unsetUser = () => {
    setUserInfo({});
  }

  return (
    <UserContext.Provider
    //   value={{ onLogin: onLogin, userInfo: userData, onLogout: onLogout}}
    value={{userInfo:userInfo, setUserOn:setUser, setUserOff:unsetUser}}
    >
      {props.children}  
    </UserContext.Provider>
  );
};