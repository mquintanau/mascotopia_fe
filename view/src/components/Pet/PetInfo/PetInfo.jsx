
const PetInfo = (props) => {
  const { imageURL, petName, petAge, animalPet, petDescription } = props;
  return (
    <div className="flex  items-center justify-center">
      <div className="relative mb-4 h-[175px] w-[175px] justify-center overflow-hidden rounded-full m-4">
        <img
          src={imageURL}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="border-l-4 border-primary flex-col justify-start px-4 text-[15px] font-light text-black">
        <div className="text-left leading-8">
          <p>Name: {petName}</p>
          <p>Age: {petAge}</p>
          <p>Kind: {animalPet}</p>
          <p>Description: {petDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
