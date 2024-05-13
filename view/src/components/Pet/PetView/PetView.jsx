import PropTypes from "prop-types";
import { Camera } from "iconoir-react";

const PetView = (props) => {
  const { imageURL, petName, petAge, animalPet, petDescription } = props;

  return (
    <div className="mb-5 items-start font-semibold text-black">
      <p className="flex justify-start px-4 py-1">
        {petName + " - " + animalPet}
      </p>
      <div className="flex min-h-[250px] min-w-[300px] justify-center rounded-[13px] bg-[#A4F3B3]">
        <div className="flex items-center justify-center">
          <div className="m-4 mb-4 flex h-[175px] w-[175px] items-center justify-center overflow-hidden rounded-full bg-neutral-300 outline-dashed outline-2 hover:cursor-pointer">
            {imageURL != "" && (
              <Camera
                fontSize={50}
                className="text-neutral-600 hover:text-neutral-900"
              />
            )}
          </div>
          <div className="flex-col justify-start border-l-4 border-primary px-4 text-[15px] font-light text-black">
            <div className="text-left leading-8">
              <p>
                <span className="font-bold">Name:</span> {petName}
              </p>
              <p>
                <span className="font-bold">Kind:</span> {animalPet}
              </p>
              <p>
                <span className="font-bold">Age:</span> {petAge}
              </p>
              <p>
                <span className="font-bold">Description:</span> {petDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PetView.propTypes = {
  imageURL: PropTypes.string,
  petName: PropTypes.string.isRequired,
  petAge: PropTypes.number.isRequired,
  animalPet: PropTypes.string.isRequired,
  petDescription: PropTypes.string,
  petLocation: PropTypes.string,
};

export default PetView;
