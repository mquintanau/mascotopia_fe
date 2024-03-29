import PropTypes from "prop-types";

const Button = ({ className = "", onClick, children, ...props }) => {
  return (
    <button
      className={`rounded-lg bg-primary px-4 py-1 font-bold text-black hover:bg-black hover:text-primary ${className}`}
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
