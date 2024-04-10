import PropTypes from "prop-types";

const RectangularLogo = ({ className, ...props }) => {
  return (
    // Cambio pata que el logo sea un vector
    <a
      href="#"
      className={`ml-4 flex items-center justify-center text-black ${className}`}
      {...props}
      onClick={() => {
        console.log("Click en logo");
      }}
    >
      <img src="/shared/Logo Op 1.svg" className="w-[40px]" alt="Logo" />
      <h1 className="ml-2 text-lg font-semibold">Mascotopia</h1>
    </a>
  );
};

RectangularLogo.propTypes = {
  className: PropTypes.string,
};

export default RectangularLogo;
