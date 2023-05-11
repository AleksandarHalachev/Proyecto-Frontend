import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <ul className="navbar">
        <li>
          <NavLink to="./">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="./login">Iniciar Sesión</NavLink>
        </li>
        <li>
          <NavLink to="./logout">Logout</NavLink>
        </li>
        <li>
          <NavLink to="./registro">Registro</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
