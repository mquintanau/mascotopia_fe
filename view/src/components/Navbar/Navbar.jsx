import { useRef } from "react";

import Button from "../Button/Button";
import RectangularLogo from "../RectangularLogo/RectangularLogo";
import { Menu } from "iconoir-react";

const Navbar = () => {
  // Referencia el elemento de menu y el boton de toggle
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Se ejecuta cuando el usuario móvil desea ver el menú, por lo que
  // se cambia la clase (top) del menú para mostrarlo o esconderlo

  const toggleDropdownMenu = () => {
    menuRef.current.classList.toggle("top-20"); // clase que muestra el menú
    menuRef.current.classList.toggle("-top-full"); // clase que esconde el menú
  };

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-navbar px-5 transition-all lg:gap-8">
      <RectangularLogo className="h-full hover:cursor-pointer" />
      <div
        className="absolute -top-[300%] left-0 -z-10 flex w-full flex-col items-center justify-center gap-6 bg-navbar py-3 text-lg transition-all lg:static lg:flex-row lg:justify-end"
        ref={menuRef}
      >
        <ul className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
          <li className="hover:cursor-pointer hover:text-greenLogo active:font-bold">
            Inicio
          </li>
          <li className="hover:cursor-pointer hover:text-greenLogo active:font-bold">
            Sobre Nosotros
          </li>
          <Button className="bg-green1">Registrarse</Button>
          <Button>Iniciar Sesión</Button>
        </ul>
      </div>
      <div ref={toggleRef} className="lg:hidden">
        <Menu onClick={toggleDropdownMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
