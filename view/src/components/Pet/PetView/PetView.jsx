import PropTypes from "prop-types";
import PetDefaultPhoto from "../../../assets/pet.png";

const PetView = (props) => {
  const { imageURL, petName, petAge, animalPet, petDescription } = props;

  return (
    <div className="mb-5 items-start font-semibold text-black">
      <p className="outline-blac mb-2 flex w-fit justify-start rounded-md bg-white bg-opacity-85 px-4 py-1 outline outline-[2.5px]">
        {petName + " - " + animalPet}
      </p>
      <div className="flex min-h-[250px] min-w-[300px] justify-center rounded-[13px] bg-[#A4F3B3]">
        <div className="flex items-center justify-center">
          <div className="relative m-4 mb-4 h-[175px] w-[175px] justify-center overflow-hidden">
            <img
              src={
                imageURL ? `http://localhost:4000${imageURL}` : PetDefaultPhoto
              }
              className={`h-full w-full object-cover ${imageURL ? "rounded-full" : ""}`}
            />
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
