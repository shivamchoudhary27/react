import React, { useState } from 'react';

const UserContext = React.createContext({});

export default UserContext;

export function UserContextProvider(props) {
  const prop = props;
  const [userInfo, setUserInfo] = useState({ userAuth: {}, userInfo: {} });

  const setUser = (data) => {
    setUserInfo(data);
  };

  const unsetUser = (data) => {
    setUserInfo(data);
  };

  return (
    <UserContext.Provider
      value={{ userInfo, setUserOn: setUser, setUserOff: unsetUser }}
    >
      {prop.children}
    </UserContext.Provider>
  );
}
