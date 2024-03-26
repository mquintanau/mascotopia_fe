import React from "react";

const Button = ({ backgroundColor = "bg-main", onClick, children }) => {
  return (
    <button
      className={`rounded-lg px-4 py-1 text-black hover:bg-main hover:text-primary ${backgroundColor}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
