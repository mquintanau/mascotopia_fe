import PetView from "../Pet/PetView/PetView";

const generatePetViews = (pets, petAge) => {
  

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
};

const PetList = ({ pets }) => {
  // Verifica si pets es un array válido
  if (!Array.isArray(pets)) {
    return null; // Devuelve null si pets no es un array válido
  }

  const userNumberPets = pets.length; // Si userNumberPets es undefined, usa la longitud de pets

  return (
    <div>
      {generatePetViews(pets, userNumberPets)}
    </div>
  );
};

export default PetList;
