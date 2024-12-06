import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/"; // Default to "/" if from is undefined
  
  console.log(from);

  return (
    <div className="container mx-auto">
      <LoginForm loginForm={from} />
    </div>
  );
};

export default LoginPage;