import { useState } from 'react';
import UserNavbarImage from "../User/UserNavbarImage/UserNavbarImage";

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
    return ( 
        <header className="bg-[#D6FEDA] sticky top-0 w-screen h-[50px] flex items-center justify-center text-black z-50">
            <div className="flex items-center justify-between">
      <div className="fixed left-0">
        <UserNavbarImage className="ml-[22px]" />
      </div>
      <div className="fixed right-0 lg:flex hidden">
        <a
          href="#"
          className="mr-[25px]"
          onClick={() => {
            console.log("Click en Noticias");
          }}
        >
          News
        </a>
        <a
          href="#"
          className="mr-[25px] "
          onClick={() => {
            console.log("Click en Foros");
          }}
        >
          Forums
        </a>
        <a
          href="#"
          className="mr-[25px]"
          onClick={() => {
            console.log("Click en Calendario");
          }}
        >
          Calendar
        </a>
      </div>
      <div className="absolute right-0 px-2 lg:hidden">
        <button onClick={toggleMenu}>
          
            {showMenu ? (
              <img src="/shared/Arrow.svg" className="w-[17px] animate-fadeIn" alt="Logo"/>
            ) : (
              <img src="/shared/Hamburger icon.svg" className="w-[20px] animate-bounce" alt="Logo"/>
            )}
          
        </button>
        {showMenu && (
          <div className="absolute top-9 right-0 bg-white w-screen border rounded shadow-lg">
            <a
              href="#"
              className="block px-4 py-2 text-black  hover:bg-gray-100"
              onClick={() => {
                console.log("Click en Noticias");
              }}
            >
              News
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => {
                console.log("Click en Foros");
              }}
            >
              Forums
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
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
}
 
export default NavBar;