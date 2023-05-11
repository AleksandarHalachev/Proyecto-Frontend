import React from "react";
import FormularioLogin from "../components/FormularioLogin";
import "./Login.css";

const Login = ({ gestionarLogin }) => {
  return (
    <div className="login">
      <FormularioLogin gestionarLogin={gestionarLogin} />
    </div>
  );
};

export default Login;
