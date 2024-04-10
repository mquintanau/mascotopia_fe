import { useState } from "react";
import { API_URL } from "../auth/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

import { User } from "iconoir-react";
import Swal from "sweetalert2";

function Signup() {
  // Variables de estado formulario
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
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
          rol,
        }),
      });

      if (response.ok) {
        console.log("El usuario se creo correctamente");
        setErrorResponse(""); //Se limpia el estado de la respuesta de error

        goTo("/login?successfullRegister=true"); //Se redirige a la página de login
      } else {
        console.log("Hubo un error en el registro");
        const json = await response.json();
        if (json && json.body && typeof json.body.error === "string") {
          // json tiene la estructura de AuthResponseError
          if (json.body.error) {
            Swal.fire({
              title: "¡Error!",
              text: json.body.error,
              icon: "error",
              confirmButtonText: "Continue",
              confirmButtonColor: "#f27474",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-full min-h-screen bg-loginBackground bg-cover py-28 lg:pl-[100px] ">
      <form
        action=""
        onSubmit={handleSubmit}
        className="pr-50 z-50 mx-auto mt-6 flex max-w-xl flex-col rounded-xl bg-navbar p-10"
      >
        <h1 className="mb-5 w-full text-center text-3xl font-bold text-black">
          Register Form
        </h1>
        <div className="flex w-3/5 flex-col">
          <Input
            type="email"
            label="Email"
            id="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <Input
            type="text"
            label="Full Name"
            id="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            type="text"
            label="Username"
            id="user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            id="pass"
            className="mt-5"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <Input
            type="password"
            label="Confirm Password"
            id="passConfirmation"
            className="mt-5"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
          />
          <Input
            type="text"
            label="Role"
            id="role"
            className="mt-5"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          />
        </div>
        <Input
          type="text"
          label="Pet name"
          id="petName"
          className="mt-5"
          value={nombreMascota}
          onChange={(e) => setnombreMascota(e.target.value)}
        />
        <Input
          type="text"
          label="Animal Type"
          id="animalType"
          className="mt-5"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
        />
        <Input
          type="text"
          label="Pet age"
          id="petAge"
          className="mt-5"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <Input
          type="text"
          label="Description"
          id="description"
          className="mt-5"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <div className="flex w-2/5 flex-col">
          <User />
        </div>
        <Button type="submit" className="mx-auto my-5 whitespace-nowrap">
          Sign Up
        </Button>
        <hr className="my-5 border-black" />
        <p className="text-center text-black">
          Do you have alredy an account?{" "}
          <a href="" className="font-semibold text-black hover:text-greenLogo">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
