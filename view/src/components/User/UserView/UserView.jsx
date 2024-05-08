import { useContext } from "react";
import PropTypes from "prop-types";
import DataContext from "../../../auth/DataContext";

const UserView = () => {
  const { data } = useContext(DataContext); // Use the context

  const { nombre, correo, username, role, mascotas, imageURL } = data;
  const roleFullName = role === "petOwner" ? "Pet Owner" : "Volunteer";

  return (
    <div className="items-start font-semibold text-black">
      <p className="flex py-1 pl-4">About You:</p>
      <div className="my-2 flex min-h-[450px] min-w-[300px] flex-col items-center justify-center rounded-[13px] bg-[#A4F3B3]">
        <div className=" mb-4 h-[175px] w-[175px] justify-center overflow-hidden rounded-full">
          <img
            src={`http://localhost:4000${imageURL}`}
            className="my-2 h-full w-full rounded-full"
          />
        </div>
        <div className="flex-col justify-start border-t-4 border-primary px-4 text-[15px] font-light text-black">
          <div className="py-2 text-left leading-8">
            <p>
              <span className="font-bold">Name:</span> {nombre}
            </p>
            <p>
              <span className="font-bold">Email:</span> {correo}
            </p>
            <p>
              <span className="font-bold">Username:</span> {username}
            </p>
            <p>
              <span className="font-bold">Pets:</span> {mascotas.length}
            </p>
            <p>
              {" "}
              <span className="font-bold">Role &gt;</span> {roleFullName}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

UserView.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  number_pets: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
};

export default UserView;
