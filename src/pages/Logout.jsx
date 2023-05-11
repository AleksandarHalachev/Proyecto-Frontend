import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ gestionarLogout }) => {
  const navegar = useNavigate();
  useEffect(() => {
    localStorage.removeItem("datosUsuario");
    gestionarLogout();
    navegar("/login");
  });

  return;
};

export default Logout;
