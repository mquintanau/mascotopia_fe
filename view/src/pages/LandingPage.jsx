// Esto es un componente funcional que representa la página de inicio de la aplicación.

import VisuallyHidden from "../components/VisuallyHidden/VisuallyHidden";
import DecorationLine from "../assets/decorationLine.svg";
import SignUpInvitation from "../assets/signUpInvitation.png";
import AboutUs from "../assets/aboutUs.png";

const LandingPage = () => {
  return (
    <div className="pt-30 flex h-full min-h-screen flex-col bg-cover">
      <section className="relative mt-16 flex h-[200px] w-screen items-center justify-center bg-welcome bg-contain bg-center bg-no-repeat md:mt-0 md:h-screen lg:mt-10 lg:h-screen">
        <p className="-ml-36 -mt-8 w-1/2 max-w-[234px] text-center text-xs font-bold md:-ml-44 md:w-1/3 md:text-lg lg:-ml-80 lg:max-w-[320px] lg:text-2xl">
          Welcome to Mascotopia: Your All-In-One Hub for Pet Care & Community!
        </p>
      </section>
      <section>
        <VisuallyHidden></VisuallyHidden>
        <img src={AboutUs} alt="" className="m-auto w-screen max-w-[700px]" />
        {/* TODO: Create an image alt label */}
      </section>
      <section className="flex justify-center">
        <img src={DecorationLine} className="absolute -z-10 -mt-60" />
      </section>
      <section>
        <img
          src={SignUpInvitation}
          alt=""
          className="m-auto w-screen max-w-[700px]"
        />
      </section>
    </div>
  );
};

export default LandingPage;
