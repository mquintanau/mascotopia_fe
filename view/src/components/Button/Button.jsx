import PropTypes from "prop-types";

const Button = ({ className = "", onClick, children, ...props }) => {
  return (
    <button
      className={`bg-primary hover:bg-[#A4F3B3] text-black font-bold py-2 px-7 rounded-[13px] ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button> 
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
