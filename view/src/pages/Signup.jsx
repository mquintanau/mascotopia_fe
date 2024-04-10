import { useState } from "react";
import { API_URL } from "../auth/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Swal from "sweetalert2";

function Signup() {
  // Variables de estado formulario
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombreMascota, setnombreMascota] = useState("");
  const [animal, setAnimal] = useState("");
  const [edad, setEdad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [rol, setRol] = useState("");
  // Se inicializa el estado de la respuesta de error
  const [errorResponse, setErrorResponse] = useState("");
  // Se obtiene la función de autenticación
  const auth = useAuth();
  // Se inicializa la variable de navegación
  const goTo = useNavigate();

  // Seccion Alertas
  // if (errorResponse) {
  //   Swal.fire({
  //     title: "¡Error!",
  //     text: errorResponse,
  //     icon: "error",
  //     confirmButtonText: "Continue",
  //     confirmButtonColor: "#f27474",
  //   });
  // }


  // Función que se ejecuta al enviar el formulario
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //Se envian los datos del formulario en formato JSON al servidor
          correo,
          nombre,
          username,
          contraseña,
          nombreMascota,
          animal,
          edad,
          descripcion,
          rol
        }),
      });

      if (response.ok) {
        console.log("El usuario se creo correctamente");
        setErrorResponse(""); //Se limpia el estado de la respuesta de error

        goTo("/login"); //Se redirige a la página de login
      } else {
        console.log("Hubo un error en el registro");
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
    <div className="h-full min-h-screen bg-loginBackground bg-cover py-28 lg:pl-[600px]">
      <form
        action=""
        onSubmit={handleSubmit}
        className="z-50 mx-auto mt-6 flex max-w-sm flex-col rounded-xl bg-navbar p-10"
      >
        
        {!!errorResponse && (
          <div className="errorMessage mb-4 rounded-md bg-red-400 p-2 text-white">
            {errorResponse}
          </div>
        )}
        <Input
          type="email"
          label="Email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <Input
          type="text"
          label="Nombre Completo"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Input
          type="text"
          label="Nombre de usuario"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          label="Contraseña"
          id="pass"
          className="mt-5"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <Input
          type="text"
          label="Rol"
          id="rol"
          className="mt-5"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        />
        

        <Button type="submit" className="mx-auto my-5 whitespace-nowrap">
          Sign Up
        </Button>

        <hr className="my-5 border-black" />
        <p className="text-center text-black">
          Do you have alredy an accound?{" "}
          <a href="" className="font-semibold text-black hover:text-greenLogo">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
