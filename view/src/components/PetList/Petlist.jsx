import PetView from "../Pet/PetView/PetView";

const generatePetViews = (pets) => {
    return pets.map((pet, index) => (
      <PetView
        key={index} // Asegúrate de usar un identificador único para la clave de React
        imageURL={pet.imageURL}
        petLocation={pet.petLocation}
        petName={pet.name}
        petAge={pet.age}
        animalPet={pet.kind}
        petDescription={pet.description}
      />
    ));
  };
  
  const PetList = ({ pets }) => {
    return (
      <div>
        {generatePetViews(pets)}
      </div>
    );
  };
  
  export default PetList;