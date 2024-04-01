// Hooks react
import { useRef } from "react";
// Componentes propios
import Button from "../Button/Button";
import RectangularLogo from "../RectangularLogo/RectangularLogo";
// Componentes externos
import { Menu } from "iconoir-react";
import { Link } from "react-router-dom";
import NavbarLink from "./NavbarLink";

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
    <nav className="z-50 flex h-20 items-center justify-between bg-navbar px-5 lg:gap-8">
      <Link to="/" className="h-20">
        <RectangularLogo className="h-20 hover:cursor-pointer" />
      </Link>
      <div
        className="absolute -top-full left-0 flex w-full flex-col items-center justify-center gap-6 bg-navbar py-3 text-lg transition-all lg:static lg:flex-row lg:justify-end"
        ref={menuRef}
      >
        <ul className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
          <NavbarLink to="/">Inicio</NavbarLink>
          <NavbarLink to="/">Sobre Nosotros</NavbarLink>
          <NavbarLink to="/">
            <Button className="bg-green1">Registrarse</Button>
          </NavbarLink>
          <NavbarLink to="/login">
            <Button>Iniciar Sesión</Button>
          </NavbarLink>
        </ul>
      </div>
      <div ref={toggleRef} className="lg:hidden">
        <Menu onClick={toggleDropdownMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
