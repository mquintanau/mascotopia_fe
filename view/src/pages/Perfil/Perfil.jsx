import FooterRectangle from "../../components/FooterRectangle/FooterRectangle";
import NavBar from "../../components/NavBar/NavBar";
import PetView from "../../components/Pet/PetView/PetView";
import UserView from "../../components/User/UserView/UserView";

//Ejemplos para la pagina mientras union
//Revisar como unir pet y user
const user = {
  name: "AAAaaaA css",
  email: "aaa@gmail.com",
  username: "aa123",
  role: "Volunteer",
  imageURL: "/shared/EjemploImagenUsuario.jpg",
  user_id: 20,
  birthday: "1990-06-15",
  contact_number: 1111111111,
  description: ":3",
  number_pets: 2
};

//Ejemplos para la pagina mientras union
const pet = {
  owner_id: 20,
  imageURL: "./shared/EjemploPet.jpg",
  petLocation: "Bogotá",
  name: "Fluffy",
  age: 3,
  kind: "Dog",
  description: "A fluffy and friendly dog.",
};

const Perfil = () => {
  return (
    <div
      className="mx-auto mb-10 max-w-screen-xl"
      style={{ backgroundImage: "url('public/shared/DecorationLine.svg')" }}
    >
      <NavBar />
      <div className="flex justify-center scrollbar">
        <div className="flex flex-col sm:flex-row">
          <div className="m-6">
            <UserView
              imageURL={user.imageURL}
              name={user.name}
              email={user.email}
              role={user.role}
              username={user.username}
              birthday={user.birthday}
              contact_number={user.contact_number}
              description={user.description}
              number_pets={user.number_pets}
            />
          </div>
          <div className="m-6">
            <div className="flex flex-col">
              <PetView
                imageURL={pet.imageURL}
                petLocation={pet.petLocation}
                petName={pet.name}
                petAge={pet.age}
                animalPet={pet.kind}
                petDescription={pet.description}
              />
              <PetView
                imageURL={pet.imageURL}
                petLocation={pet.petLocation}
                petName={pet.name}
                petAge={pet.age}
                animalPet={pet.kind}
                petDescription={pet.description}
              />
              {/* Se ponen mas mascotas dependiendo de la cantidad de mascotas del usuario */}
            </div>
          </div>
        </div>
      </div>
      <FooterRectangle />
    </div>
  );
};

export default Perfil;
