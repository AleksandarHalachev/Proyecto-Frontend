import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Tareas.css";

const Tareas = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [categoria, setCategoria] = useState("Personal");
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.token) {
      console.log(datosRecuperar.token);
      setUsuario(datosRecuperar.userId);
      return datosRecuperar.token;
    }
  };

  const gestorFormulario = async (data) => {
    await axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/mistareas",
        {
          titulo: data.titulo,
          descripcion: data.descripcion,
          categoria: categoria,
          fechaExpiracion: data.fechaExpiracion,
          usuario: usuario,
        },
        {
          headers: {
            Authorization: "Bearer " + extraerDatosDeUsuario(),
          },
        }
      )
      .then((response) => {
        console.log("Tarea creada correctamente", response.data);
        setMensaje("Tarea creada correctamente");
        reset();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleChange = (e) => {
    setCategoria(e.target.value);
  };

  return (
    <div className="temp">
      <div className="Form">
        <div className="title">Nueva Tarea</div>
        <div className="inputs">
          <form className="formita" onSubmit={handleSubmit(gestorFormulario)}>
            <label htmlFor="titulo">Título</label>
            <input
              className="input-form"
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Título"
              {...register("titulo", { required: true })}
            />
            {errors.titulo && <p>El título es requerido</p>}
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              className="input-form"
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
              {...register("descripcion", { required: true })}
            />
            {errors.descripcion && <p>La descripción es requerida</p>}
            <label htmlFor="categoria">Categoría</label>
            <select
              className="input-form"
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={handleChange}
            >
              <option value="Personal">Personal</option>
              <option value="Trabajo">Trabajo</option>
              <option value="Otros">Otros</option>
            </select>
            <label htmlFor="fechaExpiracion">Fecha de expiración</label>
            <input
              className="input-form"
              type="date"
              id="fechaExpiracion"
              name="fechaExpiracion"
              placeholder="Fecha de expiración"
              {...register("fechaExpiracion")}
            />
            {mensaje && <p>{mensaje}</p>}
            <input
              className="submit-button"
              type="submit"
              value="Crear Tarea"
              id="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tareas;
