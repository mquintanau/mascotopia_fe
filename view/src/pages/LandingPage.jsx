// Esto es un componente funcional que representa la página de inicio de la aplicación.

import Button from "../components/Button/Button";
import RectangularLogo from "../components/RectangularLogo/RectangularLogo";

import Group14 from "../assets/Group14.png";

const LandingPage = () => {
  return (
    <div className="pt-30 flex h-full min-h-screen flex-col bg-cover">
      <div className="bg-welcome justify-left relative mt-16 flex h-[200px] w-screen items-center bg-contain bg-center bg-no-repeat lg:h-[400px]">
        <p className="-mt-8 ml-5 w-1/2">
          Welcome to Mascotopia: Your All-In-One Hub for Pet Care & Community!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
