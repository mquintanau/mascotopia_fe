// Esto es un componente funcional que representa la página de inicio de la aplicación.

import Button from "../components/Button/Button";
import RectangularLogo from "../components/RectangularLogo/RectangularLogo";

const LandingPage = () => {
  return (
    <div className="pt-30 bg-login-background flex h-full min-h-screen flex-col items-center justify-center bg-cover">
      <div className="rounded-lg bg-main bg-opacity-80 p-8 text-center shadow-lg">
        <h1 className="m-0 p-3 text-3xl font-bold text-black">
          Hello Mascotopia Frontend!
        </h1>
        <RectangularLogo className="m-auto h-[200px] w-[400px]" />
        <Button
          onClick={() => {
            console.log("Click en botón!");
          }}
        >
          Este es un boton nuevo
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
