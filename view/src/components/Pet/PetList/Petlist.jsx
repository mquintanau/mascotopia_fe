import PetView from "../PetView/PetView";
import PropTypes from "prop-types";

const generatePetViews = (pets) => {
  return pets.map(
    (
      pet,
      index, // Mapea cada mascota a un componente de vista de mascota
    ) => (
      <PetView
        key={index} // Asegúrate de usar un identificador único para la clave de React
        imageURL={pet.imageURL}
        petName={pet.nombreMascota}
        animalPet={pet.animal}
        petAge={Number(pet.edad)}
        petDescription={pet.descripcion}
      />
    ),
  );
};

const PetList = ({ pets }) => {
  console.log(pets.animal);
  if (pets.animal !== "") {
    return <div>{generatePetViews(pets)}</div>;
  }
};

PetList.propTypes = {
  pets: PropTypes.array.isRequired,
};

export default PetList;
