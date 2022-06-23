import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./components/components.css";
import LoginForm from "./features/LoginForm";
import Dashboard from "./features/Dashboard";
import Courses from "./features/Courses";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
