import { useState } from "react";
// Componentes propios de la marca
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import RectangularLogo from "../components/RectangularLogo/RectangularLogo";

import { API_URL } from "../auth/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Swal from "sweetalert2";

function Login() {
  // Variables de estado formulario
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  // Variable de estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Variable de estado para mostrar si la tecla de mayúsculas está activada
  const [capsLockOn, setCapsLockOn] = useState(false);

  // Se inicializa la variable de navegación
  const goTo = useNavigate();
  // Se obtiene la función de autenticación
  const auth = useAuth();

  // Seccion Alertas

  

  function showDataProtection() {
    Swal.fire({
      title: "Data Protection",
      text: "We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.",
      icon: "info",
      confirmButtonText: "Continue",
      confirmButtonColor: "#f27474",
    });
  }

  // Función que se ejecuta al enviar el formulario
  async function handleSubmit(e) {
    e.preventDefault();
 
    try {
      const response = await fetch(`${API_URL}/login`, {
        //Se realiza una petición POST al servidor y se espera la respuesta
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //Se envian los datos del formulario en formato JSON al servidor
          correo,
          contraseña,
        }),
      });
      if (response.ok) {
        console.log("Login successful"); // TODO Reemplazar por sweetaXlert
        setErrorResponse(""); //Se limpia el estado de la respuesta de error
        const json = await response.json();
        if (
          json &&
          json.body &&
          json.body.user &&
          json.body.accessToken &&
          json.body.refreshToken
        ) {
          auth.saveUser(json);
          goTo("/perfil");
        }
      } else {
        console.log("Something went wrong");
        const json = await response.json();
        if (json && json.body && typeof json.body.error === "string") {
          if (json.body.error) {
            Swal.fire({
              title: "¡Error!",
              text: json.body.error,
              icon: "error",
              confirmButtonText: "Continue",
              confirmButtonColor: "#f27474",
            });
          }
      
          // json tiene la estructura de AuthResponseError
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="h-full min-h-screen bg-login-background bg-cover py-28 lg:pl-[600px]">
        <form
          action=""
          onSubmit={handleSubmit}
          className="z-50 mx-auto mt-6 flex max-w-sm flex-col rounded-xl bg-navbar p-10"
        >
          <RectangularLogo className="m-auto mb-5 w-3/4 translate-x-3" />
          <Input
            type="text"
            label="Email/Username"
            id="user"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            onKeyDown={(e) => setCapsLockOn(e.getModifierState("CapsLock"))}
            style={{ color: "black" }}
          />
          {capsLockOn && <p style={{ color: "red" }}>Mayusculas activadas.</p>}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              id="pass"
              className="mt-5"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              onKeyDown={(e) => setCapsLockOn(e.getModifierState("CapsLock"))}
              style={{ color: "black", flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                color: "black",
                top: "calc(50% - -3px)", // Ajusta este valor
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <a
            href="/forgotPassword"
            className="text-center font-light text-black hover:text-greenLogo active:font-normal"
          >
            Forgot Password?
          </a>

          <Button type="submit" className="mx-auto my-5 whitespace-nowrap">
            Login
          </Button>

          <hr className="my-5 border-black" />
          <p className="text-center text-black">
            Don't have an account?{" "}
            <a
              href=""
              className="font-semibold text-black hover:text-greenLogo"
            >
              Sign Up
            </a>
          </p>
          <a
            onClick={showDataProtection}
            className="cursor-pointer text-center"
          >
            <p className="mt-4 text-black">Terms & Conditions</p>
          </a>
        </form>
      </div>
    </>
  );
}

export default Login;
