import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import DataContext from "../../auth/DataContext";
import UserNavbarImage from "../User/UserNavbarImage/UserNavbarImage";
import Button from "../Button/Button";

const NavbarInternal = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    goTo("/login");
  };

  const goTo = useNavigate();
  const { data } = useContext(DataContext);

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

  return (
    <header className="fixed top-0 z-50 flex h-[50px] w-screen items-center justify-between bg-[#D6FEDA] text-black">
      <Link to={`/profile/${data && data._id ? data._id : ""}`}>
        <div className="ml-[22px]">
          <UserNavbarImage username={data ? data.nombre : ""} />
        </div>
      </Link>
      <div className="hidden h-full lg:flex">
        <div className="mr-[25px] flex items-center justify-center hover:border-b-2 hover:border-primary hover:font-semibold hover:text-[#424a49]">
          <Link to="/feed">News</Link>
        </div>

        <div className="mr-[25px] flex items-center justify-center hover:border-b-2 hover:border-primary hover:font-semibold hover:text-[#424a49]">
          <Link to="/forum">Forums</Link>
        </div>

        <div className="mr-[25px] flex items-center justify-center hover:border-b-2 hover:border-primary hover:font-semibold hover:text-[#424a49]">
          <Link to="/calendar">Calendar</Link>
        </div>

        <div className="mr-[25px] flex items-center justify-center hover:border-b-2 hover:border-primary hover:font-semibold hover:text-[#424a49]">
          <Link to="/lostPets">Lost Pets</Link>
        </div>
        <Button className="my-2 mr-5" onClick={signOut}>
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
            <Link
              to="/feed"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              News
            </Link>
            <Link
              to="/forum"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Forums
            </Link>
            <a
              href="/calendar"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Calendar
            </a>
            <a
              href="/lostPets"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Lost Pets
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
    </header>
  );
};

export default NavbarInternal;
