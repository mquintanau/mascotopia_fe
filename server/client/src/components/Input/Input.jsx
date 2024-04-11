import PropTypes from "prop-types";

const Input = ({ id, label, className, ...props }) => {
  return (
    <div className={`relative my-3 w-full ${className}`}>
      <input
        id={id}
        className={`peer w-full rounded-2xl bg-main px-3 py-2.5 placeholder-transparent`}
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute -top-6 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {label}
      </label>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Input;
