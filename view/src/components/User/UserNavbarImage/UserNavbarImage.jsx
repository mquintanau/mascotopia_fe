import PropTypes from "prop-types";

const UserNavbarImage = ({ className, ...props }) => {
  return (
    <a href="#" className={`flex items-center justify-center text-black hover:text-[#424a49] ${className}`} {...props}
    onClick={() => {
      console.log("Click en Perfil");
    }}>
      <img src="public\shared\EjemploImagenUsuario.jpg" className="w-10 h-10 rounded-full" alt="Avatar del usuario" />
      <h1 className="text-24 font-semibold ml-2">Username</h1>
    </a>
  );
};

UserNavbarImage.propTypes = {
  className: PropTypes.string,
};

export default UserNavbarImage;
