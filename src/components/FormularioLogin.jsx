import { React } from "react";
import "./FormularioLogin.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormularioLogin = ({ gestionarLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegar = useNavigate();

  const gestorFormulario = async (data) => {
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/usuarios/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log("Todo correcto", response.data);
        localStorage.setItem(
          "datosUsuario",
          JSON.stringify({
            userId: response.data.userId,
            token: response.data.token,
          })
        );
        gestionarLogin(response.data);
        navegar("/mistareas");
      })
      .catch((error) => {
        console.log(error);
        console.log(process.env.REACT_APP_BACKEND_URL + "/usuarios/login");
      });
  };

  return (
    <div>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit(gestorFormulario)}>
          <span className="title">Iniciar Sesión</span>
          <span className="subtitle">Inicia sesión con tu email.</span>
          <div className="form-container">
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register(
                "email",
                {
                  pattern:
                    /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                },
                { minLength: 3 },
                {
                  required: true,
                  message: "Email requerido",
                }
              )}
            />
            {errors.email &&
              errors.email.type === "required" &&
              "Campo email requerido"}
            {errors.email &&
              errors.email.type === "minLength" &&
              "Longitud mínima de 3 caracteres."}
            {errors.email &&
              errors.email.type === "pattern" &&
              "Formato de email incorrecto"}

            <input
              type="password"
              className="input"
              placeholder="Contraseña"
              {...register(
                "password",
                {
                  pattern:
                    /^(?=.*[0-9!@#$%^&*()_+=[\]{};':"|,.<>/?])(?=.*[A-Z]).+$/,
                },
                { minLength: 6, maxLength: 32 },
                {
                  required: true,
                  message: "Contraseña requerida",
                }
              )}
            />
            {errors.password &&
              errors.password.type === "minLength" &&
              "Longitud mínima de la contraseña de 6 caracteres"}
            {errors.password &&
              errors.password.type === "maxLength" &&
              "Longitud máxima de la contraseña de 32 caracteres"}
            {errors.password &&
              errors.password.type === "required" &&
              "Contraseña requerida"}
            {errors.password &&
              errors.password.type === "pattern" &&
              "Formato de contraseña incorrecto. Mínimo un símbolo y una mayúscula"}
          </div>
          <button>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioLogin;
