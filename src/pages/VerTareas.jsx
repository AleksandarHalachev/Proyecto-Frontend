import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VerTareas.css";

const VerTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.userId) {
      setUsuario(datosRecuperar.userId);
      return datosRecuperar.token;
    }
  };

  useEffect(() => {
    const obtenerTareas = async () => {
      const token = extraerDatosDeUsuario();
      if (token) {
        try {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/mistareas/usuario/${usuario}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setTareas(response.data.tareas);
        } catch (error) {
          console.error(error);
        }
      }
    };
    obtenerTareas();
  }, [usuario]);

  const eliminarTarea = async (id) => {
    const token = extraerDatosDeUsuario();
    if (token) {
      try {
        await axios.delete(
          process.env.REACT_APP_BACKEND_URL + `/mistareas/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTareas(tareas.filter((tarea) => tarea._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Tareas del usuario</h1>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea._id}>
            <h2>{tarea.titulo}</h2>
            <p>{tarea.descripcion}</p>
            <p>Categoría: {tarea.categoria}</p>
            <p>Creada: {tarea.fechaCreacion}</p>
            <p>Expira: {tarea.fechaExpiracion}</p>
            <button onClick={() => eliminarTarea(tarea._id)}>
              Eliminar tarea
            </button>
            <Link to={`/modificartareas/${tarea._id}`}>
              <button>Modificar tarea</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerTareas;
