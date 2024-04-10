
import FooterRectangle from "../../components/FooterRectangle/FooterRectangle";
import NavBar from "../../components/NavbarExternal/NavbarExternal";
import PetView from "../../components/Pet/PetView/PetView";
import UserView from "../../components/User/UserView/UserView";

import { API_URL } from "../../auth/constants";
import React, { useState, useEffect } from 'react';

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
  const [data, setData] = useState(null); //Variable de estado para guardar los datos del usuario

  useEffect(() => {
    fetch(`${API_URL}/userProfile`)
    .then(response => response.json())//Convierte la respuesta a un objeto JSON
    .then(data => {//Con los datos obtenidos se hace lo siguiente
      // Aquí puedes utilizar los datos que recibiste
      setData(data);//Imprime en consola los datos obtenidos
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div
      className="mx-auto mb-10 max-w-screen-xl"
      style={{ backgroundImage: "url('public/shared/DecorationLine.svg')" }}
    >
      <NavBar />
      <div className="flex justify-center scrollbar">
        <div className="flex flex-col sm:flex-row">
          <div className="m-6">
          {data && 
            <UserView
              imageURL={user.imageURL} //Falta
              name={data.nombre}
              email={data.correo}
              role={data.rol}
              username={data.username}
              birthday={user.birthday} //Falta
              contact_number={user.contact_number} //Falta
              description={data.descripcion}
              number_pets={data.number_pets} //Falta
             />
          }
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
