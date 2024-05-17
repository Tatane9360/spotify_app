// src/components/Login.js
import React from "react";
import LoginText from "./LoginText";

const Login = ({ token }) => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      {!token && <LoginText />}
    </div>
  );
};

export default Login;
