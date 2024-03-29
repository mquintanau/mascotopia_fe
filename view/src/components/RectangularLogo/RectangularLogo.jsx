import PropTypes from "prop-types";

const RectangularLogo = ({ className, ...props }) => {
  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <img
        src="https://i.ibb.co/R2H7816/image.png"
        alt="Logo"
        className="h-full w-full object-contain"
      />
    </div>
  );
};

RectangularLogo.propTypes = {
  className: PropTypes.string,
};

export default RectangularLogo;
