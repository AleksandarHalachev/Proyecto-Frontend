import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import { React, useState } from "react";
import Tareas from "./pages/Tareas";
import ModificarTareas from "./pages/ModificarTareas";
import VerTareas from "./pages/VerTareas";

const App = () => {
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [datos, setDatos] = useState({});

  const gestionarLogin = (data) => {
    setDatos(data);
    setTieneAcceso(true);
  };

  const gestionarLogout = () => {
    setTieneAcceso(false);
  };

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          {tieneAcceso === false ? (
            <div>
              <NavLink className={"navlink"} to="/">
                Inicio
              </NavLink>
            </div>
          ) : (
            <div>
              <NavLink className={"navlink"} to="/añadirtareas">
                Añadir Tareas
              </NavLink>
              <NavLink className={"navlink"} to="/mistareas">
                Ver Tareas
              </NavLink>
              <NavLink className={"navlink"} to="/logout">
                Logout
              </NavLink>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/añadirtareas" element={<Tareas />} />
          <Route path="/modificartareas/:id" element={<ModificarTareas />} />
          <Route path="/mistareas" element={<VerTareas />} />
          <Route
            path="/login"
            element={<Login gestionarLogin={gestionarLogin} />}
          />

          <Route
            path="/logout"
            element={<Logout gestionarLogout={gestionarLogout} />}
          />
          <Route path="/signup" element={<Registro />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
