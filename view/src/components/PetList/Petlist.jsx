import PetView from "../Pet/PetView/PetView";

const generatePetViews = (pets, userNumberPets) => {
  if (isNaN(userNumberPets)) {
    return null; // Devuelve null si no hay mascotas
  }else{
    return pets.map((pet, index) => (
      <PetView
        key={index} // Asegúrate de usar un identificador único para la clave de React
        imageURL={pet.imageURL}
        petName={pet.nombreMascota}
        animalPet={pet.animal}
        petAge={pet.edad}
        petDescription={pet.descripcion}
      />
    ));
  }
};

  
  const PetList = ({ pets }) => {
    return (
      <div>
        {generatePetViews(pets)}
      </div>
    );
  };
  
  export default PetList;