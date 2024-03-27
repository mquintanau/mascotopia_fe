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
    menuRef.current.classList.toggle("top-20");
    menuRef.current.classList.toggle("-top-full");
  };

  return (
    <nav className="bg-navbar flex h-20 items-center justify-between px-5 lg:gap-8">
      <RectangularLogo className="h-full hover:cursor-pointer" />
      <div
        className="bg-navbar absolute -top-full left-0 flex w-full flex-col items-center justify-center gap-6 py-3 text-lg lg:static lg:flex-row lg:justify-end"
        ref={menuRef}
      >
        <ul className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
          <li className="hover:text-greenLogo hover:cursor-pointer hover:font-bold">
            Inicio
          </li>
          <li className="hover:text-greenLogo hover:cursor-pointer hover:font-bold">
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
