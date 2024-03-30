// login.js
import React from "react";
import "../Styles/login.css";

const Login = () => {
  const loginWithGoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <button className="login-with-google-btn" onClick={loginWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Login;
