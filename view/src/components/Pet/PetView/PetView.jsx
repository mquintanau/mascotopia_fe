import PropTypes from "prop-types";

const PetView = (props) => {
  const { imageURL, petName, petAge, animalPet, petDescription } = props;
  return (
    <div className="items-start font-semibold text-black">
      <p className="flex justify-start px-4 py-1">Pet</p>
      <div className="flex min-h-[250px] min-w-[300px] justify-center rounded-[13px] bg-[#A4F3B3]">
        <div className="flex  items-center justify-center">
          <div className="relative m-4 mb-4 h-[175px] w-[175px] justify-center overflow-hidden rounded-full">
            <img
              src={imageURL}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex-col justify-start border-l-4 border-primary px-4 text-[15px] font-light text-black">
            <div className="text-left leading-8">
              <p>Name: {petName}</p>
              <p>Kind: {animalPet}</p>
              <p>Age: {petAge}</p>
              <p>Description: {petDescription}</p>
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
