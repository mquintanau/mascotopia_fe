import { useState } from "react";
import UserNavbarImage from "../User/UserNavbarImage/UserNavbarImage";
import NavbarLink from "../NavbarExternal/NavbarLink";
import { Link } from "react-router-dom";

const NavbarInternal = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [activeLink, setActiveLink] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveLink(index);
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="sticky top-0 z-50 flex h-[50px] w-screen items-center justify-center bg-[#D6FEDA] text-black">
      <div className="flex w-full items-center justify-between">
        <Link to="/profile">
          <div className="ml-[22px]">
            <UserNavbarImage />
          </div>
        </Link>
        <div className="hidden lg:flex">
          <div className="mr-[25px]">
            <a
              href="#"
              className={`pb-[13px] text-black hover:text-[#424a49] ${
                activeLink === 0 ? "border-b-2 border-primary text-primary" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                console.log("Click en Noticias");
              }}
            >
              News
            </a>
          </div>

          <div className="mr-[25px]">
            <a
              href="#"
              className={`pb-[13px] text-black hover:text-[#424a49] ${
                activeLink === 1 ? "border-b-2 border-primary text-primary" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                console.log("Click en Foros");
              }}
            >
              Forums
            </a>
          </div>

          <div className="mr-[25px]">
            <a
              href="#"
              className={`pb-[13px] text-black hover:text-[#424a49] ${
                activeLink === 2 ? "border-b-2 border-primary text-primary" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                console.log("Click en Calendario");
              }}
            >
              Calendar
            </a>
          </div>
        </div>
        <div className="absolute right-0 px-2 lg:hidden">
          <button onClick={toggleMenu}>
            {showMenu ? (
              <img
                src="/shared/Arrow.svg"
                className="w-[17px] animate-fadeIn"
                alt="Logo"
              />
            ) : (
              <img
                src="/shared/Hamburger icon.svg"
                className="w-[20px] animate-bounce"
                alt="Logo"
              />
            )}
          </button>
          {showMenu && (
            <div className="absolute right-0 top-9 w-screen rounded border bg-white shadow-lg">
              <a
                href="#"
                className="block px-4 py-2 text-black hover:bg-gray-100"
                onClick={() => console.log("Click en Noticias")}
              >
                News
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => console.log("Click en Foros")}
              >
                Forums
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => console.log("Click en Calendario")}
              >
                Calendar
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarInternal;
