import { Link } from "react-router-dom";
import RectangularLogo from "../RectangularLogo/RectangularLogo";

const FooterRectangle = () => {
  return (
    <footerRectangle className=" h-[50px] w-full items-center bg-[#ffffff] py-4 text-sm font-light text-black">
      <div className=" grid w-screen flex-none grid-cols-1 items-center md:grid-cols-3">
        <div className="justify-left flex items-center p-4 ">
          <div className="hidden md:flex">
            © 2024 Mascotopia. All rights reserved
          </div>
        </div>
        <div className="flex w-full items-center justify-center p-4 text-center md:w-auto">
          <a
            href="#"
            className="mr-[25px] text-black hover:text-[#424a49]"
            onClick={() => {
              console.log("Click en Contact Us");
            }}
          >
            Contact Us
          </a>
          <a
            href="#"
            className="mr-[25px] text-black hover:text-[#424a49]"
            onClick={() => {
              console.log("Click en Privacy Policy");
            }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="mr-[25px] text-black hover:text-[#424a49]"
            onClick={() => {
              console.log("Click en Terms of Use");
            }}
          >
            Terms of Use
          </a>
        </div>
        <div className="flex items-center justify-end p-4">
          <Link to="/">
            <div className="hidden md:flex">
              <RectangularLogo className="ml-[25px]" />
            </div>
          </Link>
        </div>
      </div>
    </footerRectangle>
  );
};

export default FooterRectangle;
