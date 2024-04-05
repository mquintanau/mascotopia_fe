import RectangularLogo from "../RectangularLogo/RectangularLogo";

const Footer = () => {
  return (
    <div className="grid w-screen grid-cols-1 md:grid-cols-3 items-center">
      <div className="justify-left flex items-center p-4 ">
        <div className="hidden md:flex">
          © 2024 Mascotopia. All rights reserved
        </div>
      </div>
      <div className="flex items-center justify-center p-4 md:w-auto w-full text-center">
        <a
          href="#"
          className="mr-[25px]"
          onClick={() => {
            console.log("Click en Contact Us");
          }}
        >
          Contact Us
        </a>
        <a
          href="#"
          className="mr-[25px] "
          onClick={() => {
            console.log("Click en Privacy Policy");
          }}
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="mr-[25px]"
          onClick={() => {
            console.log("Click en Terms of Use");
          }}
        >
          Terms of Use
        </a>
      </div>
      <div className="flex items-center justify-end p-4">
        <div className="hidden md:flex">
          <RectangularLogo className="ml-[25px]" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
