import React, { useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './components/components.css';
import LoginForm from './features/LoginForm';
import Dashboard from './components/Dashboard';

const App = () => {
  const [userLogin, setEmailInput] = useState("");

  const loginHandler = (user = null) => {
     console.log(user);
     if (user != '') {
        setEmailInput(user);
     }
  }

 
  if (localStorage.getItem('token')) {
    return (
      <Dashboard />
    );
  }

  return (
    <div className="App">       
      <header className="App-header">
        <LoginForm onLogin={loginHandler}></LoginForm>
      </header>
    </div>
  );
}

export default App;
