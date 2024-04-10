


const PetView = (props) => {
    const { imageURL, petName, petAge, animalPet, petDescription, petLocation } = props;
  return (
    <div className="items-start font-semibold text-black">
      <p className="flex justify-start px-4 py-1">Pet</p>
      <div className="flex min-h-[250px] min-w-[300px] justify-center rounded-[13px] bg-[#A4F3B3]">
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
          <p>Location: {petLocation}</p>
          <p>Age: {petAge}</p>
          <p>Kind: {animalPet}</p>
          <p>Description: {petDescription}</p>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default PetView;