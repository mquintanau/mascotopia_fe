import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import RectangularLogo from "../components/RectangularLogo/RectangularLogo";
import LoginDog from "../assets/loginDog.png";
import LoginLine from "../assets/loginLine.png";

function Login() {
  return (
    <>
      <form
        action=""
        className="mx-auto mt-6 flex max-w-sm flex-col rounded-xl bg-navbar p-10"
      >
        <RectangularLogo className="m-auto mb-5 w-3/4 translate-x-3" />
        <Input type="text" label="Email/Nombre de usuario" id="user" />
        <Input type="password" label="Contraseña" id="pass" className="mt-5" />

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
          <a href="" className="font-semibold text-black hover:text-greenLogo">
            Regístrate
          </a>
        </p>
      </form>
    </>
  );
}

export default Login;
