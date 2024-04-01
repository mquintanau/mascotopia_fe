import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavbarLink = ({ to = "/", children, ...props }) => {
  return (
    <Link
      to={to}
      className="font-normal text-black no-underline hover:cursor-pointer hover:text-greenLogo active:font-bold"
      {...props}
    >
      <li>{children}</li>
    </Link>
  );
};

NavbarLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default NavbarLink;
