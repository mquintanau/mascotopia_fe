import PropTypes from "prop-types";
import {twMerge} from "tailwind-merge"

const Topic = ({ className = "", onClick, name, ...props }) => {
  const buttonClass = twMerge("rounded-xl bg-white w-full py-1.5 px-1.5 my-3 text-2xl font-lexend font-light text-left ", className)
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {name}
    </button> 
  );
};

Topic.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default Topic;