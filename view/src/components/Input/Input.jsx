import PropTypes from "prop-types";
import {twMerge} from "tailwind-merge"

const Input = ({ id, label, className = "", inputClassName = "", labelClassName = "", ...props }) => {
  const divClass = twMerge('relative my-3 w-full', className);
  const inputClass = twMerge('peer w-full rounded-2xl bg-main px-3 py-2.5 placeholder-transparent', inputClassName);
  const labelClass = twMerge('absolute -top-6 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-focus:text-gray-600', labelClassName);
  
  return (
    <div className={divClass}>
      <input
        id={id}
        className={inputClass}
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={id}
        className={labelClass}
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
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default Input;