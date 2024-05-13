import { Link } from "react-router-dom";
import RectangularLogo from "../RectangularLogo/RectangularLogo";
import Swal from "sweetalert2";

const FooterRectangle = () => {
  function showTermsOfUse() {
    Swal.fire({
      title: "Terms of Use",
      html: `
      <span>
      By using our app, you agree to the following terms of use:
      <br><br>
      - You will not use the app for any unlawful purposes.
      <br><br>
      - You will not use the app to send spam.
      <br><br>
      - You will not attempt to gain unauthorized access to the app.
      <br><br> 
      </span>
      `,
      icon: "info",
      confirmButtonText: "Continue",
      confirmButtonColor: "#6FC2BD",
    });
  }

  function showContactUs() {
    Swal.fire({
      title: "Contact Us",
      html: `
      <span>
      If you have any questions or concerns about our policy, or our practices with regards to your personal information, please 
      contact us through our e-mail address:
      <br><br> 
      <p style= "color: green;">
      mascotopiapp@gmail.com
      </p>
      </span>
      `,
      icon: "info",
      confirmButtonText: "Continue",
      confirmButtonColor: "#6FC2BD",
    });
  }

  function showDataProtection() {
    Swal.fire({
      title: "Data Protection",
      html: `
      <span>
      We are committed to protecting your personal information and your
      right to privacy. If you have any questions or concerns about our
      policy, or our practices with regards to your personal information,
      please contact us.
      <br><br>
    
      The system manages a personal data policy in accordance with Colombian law 1581 of 2012.
      <a href="https://www.minambiente.gov.co/politica-de-proteccion-de-datos-personales/" target="_blank" style="color: blue; text-decoration: underline;">
        Consult here
      </a>
      </span>
      `,
      icon: "info",
      confirmButtonText: "Continue",
      confirmButtonColor: "#78D8AB",
    });
  }

  return (
    <div className="w-full items-center bg-white text-sm font-light text-black">
      <div className="grid w-screen flex-none grid-cols-1 items-center md:grid-cols-3">
        <div className="justify-left flex items-center p-4">
          <div className="hidden md:flex">
            © 2024 Mascotopia. All rights reserved
          </div>
        </div>
        <div className="flex w-full items-center justify-center p-4 text-center md:w-auto">
          <a
            href="#"
            className="mr-[25px] text-black hover:text-[#424a49]"
            onClick={showContactUs}
          >
            Contact Us
          </a>
          <a
            href="#"
            className="mr-[25px] text-black hover:text-[#424a49]"
            onClick={showDataProtection}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="mr-[25px] text-black hover:text-[#424a49]"
            onClick={showTermsOfUse}
          >
            Terms of Use
          </a>
        </div>
        <div className="flex items-center justify-end p-4">
          <Link to="/" target="_BLANK">
            <div className="hidden md:flex">
              <RectangularLogo className="ml-[25px]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterRectangle;
