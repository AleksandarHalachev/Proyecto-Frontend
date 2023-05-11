import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ModificarTareas.css";

const ModificarTareas = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [error, setError] = useState("");
  const [modificado, setModificado] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const obtenerTarea = async () => {
      const token = extraerDatosDeUsuario();
      if (token) {
        try {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/mistareas/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const tarea = response.data.tarea;
          setTitulo(tarea.titulo);
          setDescripcion(tarea.descripcion);
          setCategoria(tarea.categoria);
          setFechaExpiracion(tarea.fechaExpiracion);
        } catch (error) {
          console.error(error);
          setError("Hubo un problema al obtener la tarea.");
        }
      }
    };
    obtenerTarea();
  }, [id]);

  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.userId) {
      return datosRecuperar.token;
    }
  };

  const modificarTarea = async (e) => {
    e.preventDefault();
    const token = extraerDatosDeUsuario();
    if (token) {
      try {
        await axios.patch(
          process.env.REACT_APP_BACKEND_URL + `/mistareas/${id}`,
          {
            titulo,
            descripcion,
            categoria,
            fechaExpiracion,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTitulo("");
        setDescripcion("");
        setCategoria("");
        setFechaExpiracion("");
        setModificado(true);
      } catch (error) {
        console.error(error);
        setError("Hubo un problema al modificar la tarea.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Modificar tarea</h1>
      {error && <p>{error}</p>}
      {modificado && <p>Tarea modificada correctamente.</p>}
      <form onSubmit={modificarTarea} className="formulario-modificar-tarea">
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </label>
        <label>
          Categoría:
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </label>
        <label>
          Fecha de expiración:
          <input
            type="date"
            value={fechaExpiracion}
            onChange={(e) => setFechaExpiracion(e.target.value)}
          />
        </label>
        <button type="submit">Modificar tarea</button>
      </form>
    </div>
  );
};

export default ModificarTareas;
