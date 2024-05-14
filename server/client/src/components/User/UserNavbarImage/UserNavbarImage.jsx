import PropTypes from "prop-types";
import { useContext } from "react";
import DataContext from "../../../auth/DataContext";

const UserNavbarImage = ({ className, ...props }) => {
  const { data } = useContext(DataContext);
  const { username } = props;
  return (
    <div
      className={`flex items-center justify-center text-black hover:text-[#424a49] ${className}`}
      onClick={() => {
        console.log("Click en Perfil");
      }}
      {...props}
    >
      {data && data.imageURL ? (
        <img
          src={"https://mascotopia-fe.onrender.com" + data.imageURL}
          className="h-10 w-10 rounded-full"
          alt="Avatar del usuario"
        />
      ) : (
        <img
          src="https://via.placeholder.com/150"
          className="h-10 w-10 rounded-full"
          alt="Avatar del usuario"
        />
      )}
      <h1 className="ml-2 text-[17px] font-semibold">{username}</h1>
    </div>
  );
};

UserNavbarImage.propTypes = {
  className: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default UserNavbarImage;
