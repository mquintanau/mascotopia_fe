import PetInfo from "../PetInfo/PetInfo";

//Ejemplos para la pagina mientras union
const pet = {
    imageURL:"./shared/EjemploPet.jpg",
    name: "Fluffy",
    age: 3,
    kind: "Dog",
    description: "A fluffy and friendly dog."
  };

const PetInfoBox = () => {
    return ( 
        <div className="min-h-[250px] min-w-[300px] bg-[#A4F3B3] rounded-[13px] flex justify-center">
            <PetInfo 
                imageURL={pet.imageURL}
                petName={pet.name}
                petAge={pet.age}
                animalPet={pet.kind}
                petDescription={pet.description}
            />
        </div>
     );
}
 
export default PetInfoBox;