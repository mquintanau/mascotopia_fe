import { useState } from "react";
// Componentes propios de la marca
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import RectangularLogo from "../components/RectangularLogo/RectangularLogo";

import { API_URL } from "../auth/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useParams } from 'react-router-dom';

function ResetPassword() {
  // Variables de estado formulario
  const [contraseña, setContraseña] = useState("");
  const [contraseñaRev, setContraseñaRev] = useState("");
  // Variable de estado para mostrar si la tecla de mayúsculas está activada
  const [capsLockOn, setCapsLockOn] = useState(false);
  // Se inicializa el estado de la respuesta de error
  const [errorResponse, setErrorResponse] = useState("");
  const {id, token} = useParams();
  // Se inicializa la variable de navegación
  const goTo = useNavigate();
  // Se obtiene la función de autenticación
  const auth = useAuth();



  // Función que se ejecuta al enviar el formulario
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/resetPassword/${id}/${token}`, {
        //Se realiza una petición POST al servidor y se espera la respuesta
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          //Se envian los datos del formulario en formato JSON al servidor
          contraseña,
          contraseñaRev
          
          
        }),
      });
      if (response.ok) {
        localStorage.removeItem('tokenReset');
        goTo("/login?passwordReset=true")
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
      <div className="h-screen  bg-line-background bg-cover bg-right flex items-center justify-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className="z-50 mx-auto mt-6 flex max-w-xxl flex-col rounded-xl bg-navbar p-10 text-black text-center"
        >
          <RectangularLogo className="m-auto mb-5 w-full -ml-1" />
          Enter your new Password
          <br></br>
          <br></br>
          {!!errorResponse && (
            <div className="errorMessage mb-4 rounded-md bg-red-400 p-2 text-white">
              {errorResponse}
            </div>
          )}
          <Input
            type="text"
            label="Password"
            id="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            onKeyDown={(e) => setCapsLockOn(e.getModifierState("CapsLock"))}
            style={{ color: 'black' }}
          />
          {capsLockOn && <p style={{ color: 'red' }}>Mayusculas activadas.</p>}
          <Input
            type="text"
            label="Confirm Your Password"
            id="passwordRev"
            value={contraseñaRev}
            onChange={(e) => setContraseñaRev(e.target.value)}
            onKeyDown={(e) => setCapsLockOn(e.getModifierState("CapsLock"))}
            style={{ color: 'black' }}
          />

          <Button type="submit" className="mx-auto my-5 whitespace-nowrap">
            Update
          </Button>
        </form>
      </div>
  );
}

export default ResetPassword;
