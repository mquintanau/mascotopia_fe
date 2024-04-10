import { useState, useEffect } from "react";
// Componentes propios de la marca
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import RectangularLogo from "../components/RectangularLogo/RectangularLogo";
import Swal from "sweetalert2";

import { API_URL } from "../auth/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function Login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successfulRegister = queryParams.get("successfullRegister");
  const passwordSent = queryParams.get("passwordSent");
  const passwordReset = queryParams.get("passwordReset");

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const goTo = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    // Codigo que se ejecuta al cargar el componente (solo una vez)
    if (successfulRegister) {
      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Please login to continue",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#f27474",
      });
    } else if (passwordReset) {
      Swal.fire({
        title: "¡Success!",
        text: "Your password has been reset successfully",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#f27474",
      });
    } else if (passwordSent) {
      Swal.fire({
        title: "Almost there!",
        text: "We have sent an email for you to update your password",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#f27474",
      });
    }
  }, [successfulRegister, passwordSent, passwordReset]);

  function showDataProtection() {
    Swal.fire({
      title: "Data Protection",
      text: "We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.",
      icon: "info",
      confirmButtonText: "Continue",
      confirmButtonColor: "#f27474",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contraseña,
        }),
      });
      if (response.ok) {
        console.log("Login successful");
        const json = await response.json();
        if (
          json &&
          json.body &&
          json.body.user &&
          json.body.accessToken &&
          json.body.refreshToken
        ) {
          auth.saveUser(json);
            console.log(auth.isAuthenticated);
          goTo("/profile");
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
      <div className="bg-login-background h-full min-h-screen bg-cover py-28 lg:pl-[600px]">
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
            Don&apos;t have an account?{" "}
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
