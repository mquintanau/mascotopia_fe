import RectangularLogo from "../RectangularLogo/RectangularLogo";


const Footer = () => {
  return (
    <div className="grid grid-cols-3 w-screen items-center">
      <div className="p-4 flex justify-left items-center">
        © 2024 Mascotopia. All rights reserved
      </div>
      <div className="p-4 flex justify-center items-center">
        <a href="#" className="mr-[25px]"
        onClick={() => {
          console.log("Click en Contact Us");
        }}>
          Contact Us
        </a>
        <a href="#" className="mr-[25px] "
        onClick={() => {
          console.log("Click en Privacy Policy");
        }}>
          Privacy Policy
        </a>
        <a href="#" className="mr-[25px]"
        onClick={() => {
          console.log("Click en Terms of Use");
        }}>
          Terms of Use
        </a>
      </div>
      <div className="p-4 flex justify-end items-center">
        <RectangularLogo className="ml-[25px]" />
      </div>
    </div>
  );
};

export default Footer;
