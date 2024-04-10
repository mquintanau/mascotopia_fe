import { useState } from "react";
import UserNavbarImage from "../User/UserNavbarImage/UserNavbarImage";

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
      <div className="flex items-center justify-between">
        <div className="fixed left-0">
          <UserNavbarImage className="ml-[22px]" />
        </div>
        <div className="fixed right-0 hidden lg:flex">
          <div className="flex">
            <div className="mr-[25px]">
              <a
                href="#"
                className={`text-black hover:text-[#424a49] pb-[13px] ${
                  activeLink === 0
                    ? "border-b-2 border-primary text-primary"
                    : ""
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
                className={`text-black hover:text-[#424a49] pb-[13px] ${
                  activeLink === 1
                    ? "border-b-2 border-primary text-primary"
                    : ""
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
                className={`text-black hover:text-[#424a49] pb-[13px] ${
                  activeLink === 2
                    ? "border-b-2 border-primary text-primary"
                    : ""
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
                className="block px-4 py-2 text-black hover:bg-gray-100  hover:text-black"
                onClick={() => {
                  console.log("Click en Noticias");
                }}
              >
                News
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-black"
                onClick={() => {
                  console.log("Click en Foros");
                }}
              >
                Forums
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-black"
                onClick={() => {
                  console.log("Click en Calendario");
                }}
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
