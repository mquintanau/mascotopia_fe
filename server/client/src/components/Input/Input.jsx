import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    id,
    label,
    className = "",
    inputClassName = "",
    labelClassName = "",
    textArea = false,
    ...props
  },
  ref,
) {
  const defaultId = useId();
  const resolvedId = id || defaultId; // Use the provided ID, or the default ID if none was provided

  const divClass = twMerge("relative my-3 w-full", className);
  const inputClass = twMerge(
    "peer w-full rounded-2xl bg-main px-3 py-2.5 placeholder-transparent",
    inputClassName,
  );
  const labelClass = twMerge(
    "absolute -top-6 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-focus:text-gray-600",
    labelClassName,
  );

  return (
    <div className={divClass}>
      {textArea && (
        <textarea
          className={inputClass}
          ref={ref}
          id={resolvedId}
          placeholder={label}
          {...props}
        />
      )}
      {!textArea && (
        <input
          ref={ref}
          id={resolvedId}
          className={inputClass}
          placeholder={label}
          {...props}
        />
      )}
      <label htmlFor={resolvedId} className={labelClass}>
        {label}
      </label>
    </div>
  );
});

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

Input.displayName = "Input";

export default Input;
