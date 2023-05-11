import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

const Inicio = () => {
  return (
    <div className="inicio">
      <h1>Bienvenido a la App de Lista de Tareas</h1>
      <p>
        En esta aplicación podrás guardar, modificar o eliminar tareas
        pendientes. Para comenzar a utilizar la app, es necesario hacer login.
      </p>
      <div className="links-container">
        <Link to="/login" className="login-link">
          Iniciar Sesión
        </Link>
        <Link to="/signup" className="signup-link">
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
