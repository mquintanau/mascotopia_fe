import { useState } from "react";
// Componentes propios de la marca
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import RectangularLogo from "../components/RectangularLogo/RectangularLogo";

function Login() {
  // Variables de estado formulario
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  return (
    <>
      <div className="bg-login-background h-full min-h-screen bg-cover pb-28 pt-20 lg:pl-[600px]">
        <form
          action=""
          className="z-50 mx-auto mt-6 flex max-w-sm flex-col rounded-xl bg-navbar p-10"
        >
          <RectangularLogo className="m-auto mb-5 w-3/4 translate-x-3" />
          <Input
            type="text"
            label="Email/Nombre de usuario"
            id="user"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <Input
            type="password"
            label="Contraseña"
            id="pass"
            className="mt-5"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />

          <a
            href=""
            className="text-center font-light text-black hover:text-greenLogo active:font-normal"
          >
            ¿Olvidaste tu contraseña?
          </a>

          <Button type="submit" className="mx-auto my-5 whitespace-nowrap">
            Iniciar Sesión
          </Button>

          <hr className="my-5 border-black" />
          <p className="text-center font-light">
            ¿No tienes una cuenta?{" "}
            <a
              href=""
              className="text-b</a>lack font-semibold hover:text-greenLogo"
            >
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
