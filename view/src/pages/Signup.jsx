import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../auth/constants";
import { useAuth } from "../auth/AuthProvider";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

import { User, Wolf } from "iconoir-react";
import Swal from "sweetalert2";

import registerDecorationLine from "../assets/decorationLineRegister.svg";
import registerCat from "../assets/registerCat.png";

function Signup() {
  function showDataProtection() {
    Swal.fire({
      title: "Data Protection",
      text: "We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.",
      icon: "info",
      confirmButtonText: "Continue",
      confirmButtonColor: "#f27474",
    });
  }

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

  // Se obtiene la función de autenticación
  const auth = useAuth();
  // Se inicializa la variable de navegación
  const goTo = useNavigate();

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
    <div
      className="mx-5 h-full min-h-screen bg-cover py-28 lg:mx-0 lg:pl-[100px]"
      style={{
        backgroundImage: ` url(${registerCat}),url(${registerDecorationLine})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center, center",
        backgroundSize: "contain, contain",
      }}
    >
      <form
        action=""
        onSubmit={handleSubmit}
        className="pr-50 z-50 mx-auto mt-6 flex max-w-xl flex-col rounded-xl bg-navbar p-10"
      >
        <h1 className="mb-5 w-full text-center text-3xl font-bold text-black">
          Register Form
        </h1>
        <section className="flex flex-row-reverse flex-wrap">
          <div className="flex w-full flex-col items-center justify-around lg:w-2/5">
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white">
              <User
                className=""
                width="150px"
                height="150px"
                strokeWidth="1px"
              />
            </div>
          </div>
          <div className="flex w-full flex-col lg:w-3/5">
            <Input
              type="email"
              label="Email"
              id="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Full Name"
              id="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Username"
              id="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
            <Input
              type="password"
              label="Password"
              id="pass"
              className="mt-5"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required={true}
            />
            <Input
              type="password"
              label="Confirm Password"
              id="passConfirmation"
              className="mt-5"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              required={true}
            />
          </div>
        </section>
        <section className="mt-10 flex flex-row-reverse flex-wrap lg:mt-4">
          <div className="flex w-full flex-col items-center justify-around lg:w-2/5">
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white">
              <Wolf
                className="flex h-[120px] w-[120px] lg:mb-0"
                strokeWidth="1px"
              />
            </div>
          </div>
          <div className="flex w-full flex-col lg:w-3/5">
            <p className="mt-5 text-center lg:mt-0">
              Do you have a pet? Add its information:
            </p>
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
          </div>
        </section>
        <Input
          type="text"
          label="Description"
          id="description"
          className="mt-5"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <section>
          <p className="mb-4 text-center lg:mt-4">
            Select your role in the community:
          </p>
          <div className="flex flex-col justify-center">
            <label className="text-center">
              <input
                type="radio"
                id="petOwner"
                name="role"
                value="petOwner"
                onChange={(e) => setRol(e.target.value)}
                required={true}
              />{" "}
              Pet Owner
            </label>
            <label className="text-center">
              <input
                type="radio"
                id="organization"
                name="role"
                value="organization"
                onChange={(e) => setRol(e.target.value)}
                required={true}
              />{" "}
              Organization
            </label>
            <label className="text-center">
              <input
                type="radio"
                id="volunteer"
                name="role"
                value="volunteer"
                onChange={(e) => setRol(e.target.value)}
                required={true}
              />{" "}
              Volunteer
            </label>
          </div>
        </section>
        <section>
          <p className="mt-4 text-center text-black">
            Please, read and accept the
            <a
              onClick={showDataProtection}
              className="cursor-pointer text-center font-bold"
            >
              {" "}
              terms and conditions of use
            </a>
          </p>
        </section>

        <Button type="submit" className="mx-auto my-5 whitespace-nowrap">
          Sign Up
        </Button>
        <hr className="my-5 border-black" />
        <p className="text-center text-black">
          Do you have already an account?{" "}
          <a href="" className="font-semibold text-black hover:text-greenLogo">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
