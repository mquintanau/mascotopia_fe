import { useState } from "react";
// Componentes propios de la marca
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import RectangularLogo from "../components/RectangularLogo/RectangularLogo";

import { API_URL } from "../auth/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function ForgotPassword() {
  // Variables de estado formulario
  const [correo, setCorreo] = useState("");;
  // Variable de estado para mostrar si la tecla de mayúsculas está activada
  const [capsLockOn, setCapsLockOn] = useState(false);
  // Se inicializa el estado de la respuesta de error
  const [errorResponse, setErrorResponse] = useState("");
  // Se inicializa la variable de navegación
  const goTo = useNavigate();
  // Se obtiene la función de autenticación
  const auth = useAuth();

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
          setErrorResponse(json.body.error);
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
          {!!errorResponse && (
            <div className="errorMessage mb-4 rounded-md bg-red-400 p-2 text-white">
              {errorResponse}
            </div>
          )}
          <Input
            type="text"
            label="Email"
            id="user"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            onKeyDown={(e) => setCapsLockOn(e.getModifierState("CapsLock"))}
            style={{ color: 'black' }}
          />
          {capsLockOn && <p style={{ color: 'red' }}>Mayusculas activadas.</p>}
          <Button type="submit" className="mx-auto my-5 whitespace-nowrap">
            Send
          </Button>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
