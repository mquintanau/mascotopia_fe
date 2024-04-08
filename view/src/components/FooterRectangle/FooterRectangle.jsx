import RectangularLogo from "../RectangularLogo/RectangularLogo";


const FooterRectangle = () => {
    return ( 
        <footerRectangle className="bg-[#ffffff] h-[50px] fixed bottom-0 left-0 w-full  flex items-center py-4 text-black text-sm font-light z-50">
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
        </footerRectangle>
     );
}
 
export default FooterRectangle
