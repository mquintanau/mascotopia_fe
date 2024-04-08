import PropTypes from "prop-types";

const RectangularLogo = ({ className, ...props }) => {
  return (
    // Cambio pata que el logo sea un vector
    <a href="#" className={`flex items-center justify-center text-black hover:text-[#424a49] ml-4 ${className}`} {...props}
    onClick={() => {
      console.log("Click en logo");
    }}>
      <img src="/shared/Logo Op 1.svg" className="w-[40px]" alt="Logo"/>
      <h1 className="text-[17px] font-semibold ml-2">Mascotopia</h1>
    </a>
    
  );
};

RectangularLogo.propTypes = {
  className: PropTypes.string,
};

export default RectangularLogo;
