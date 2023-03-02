import React from "react";
import { Route, Navigate } from "react-router-dom";
import Home from "../../../pages/home/Home";
import LoginForm from "../../../pages/loginpage";
import AuthLogin from "../../../pages/authlogin/AuthLogin";

const AuthenticationRoutes = (isLoggedIn: any) => {
  return [
    <Route
      path="/"
      key="landingpage"
      element={isLoggedIn === false ? <Home /> : <Navigate to="/dashboard" />}
    />,
    <Route
      path="/login"
      key="login"
      element={
        isLoggedIn === false ? <LoginForm /> : <Navigate to="/dashboard" />
      }
    />,
    <Route path="/authlogin" key="authlogin" element={<AuthLogin />} />,
  ];
};

export default AuthenticationRoutes;
