import React, { useState } from "react";

const UserContext = React.createContext({});

export default UserContext;

export const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({ userAuth: {}, userInfo: {} });

  const setUser = (data) => {
    setUserInfo(data);
  };

  const unsetUser = (data) => {
    setUserInfo(data);
  };

  return (
    <UserContext.Provider
      value={{ userInfo: userInfo, setUserOn: setUser, setUserOff: unsetUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
