import { useState } from "react";
import UserNavbarImage from "../User/UserNavbarImage/UserNavbarImage";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import DataContext from "../../auth/DataContext";

const NavbarInternal = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goTo = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    goTo("/login");
  };

  // const user = {
  //   name: "AAAaaaA css",
  //   email: "aaa@gmail.com",
  //   username: "aa123",
  //   role: "Volunteer",
  //   imageURL: "/shared/EjemploImagenUsuario.jpg",
  //   user_id: 20,
  //   birthday: "1990-06-15",
  //   contact_number: 1111111111,
  //   description: ":3",
  //   number_pets: 2,
  // };

  const { data } = useContext(DataContext);

  console.log("Data", data);
  return (
    <header className="sticky top-0 z-50 flex h-[50px] w-screen items-center justify-center bg-[#D6FEDA] text-black">
      <div className="flex w-full items-center justify-between">
        <Link to="/profile">
          <div className="ml-[22px]">
            <UserNavbarImage username={data ? data.username : ""} />
          </div>
        </Link>
        <div className="hidden lg:flex">
          <div className="mr-[25px]">
            <a
              href="#"
              className="hover:text-[#424a49 pb-[18px] text-black hover:border-b-2 hover:border-primary hover:font-semibold"
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
              className="hover:text-[#424a49 pb-[18px] text-black hover:border-b-2 hover:border-primary hover:font-semibold"
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
              className="hover:text-[#424a49 pb-[18px] text-black hover:border-b-2 hover:border-primary hover:font-semibold"
              onClick={() => {
                console.log("Click en Calendario");
              }}
            >
              Calendar
            </a>
          </div>
          <Button className="mr-5" onClick={signOut}>
            Sign Out
          </Button>
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
              <a
                className="block px-4 py-2 font-bold text-gray-800 hover:cursor-pointer hover:bg-gray-100"
                onClick={signOut}
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarInternal;
