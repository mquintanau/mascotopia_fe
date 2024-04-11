import PetList from "../../components/PetList/Petlist";
import UserView from "../../components/User/UserView/UserView";
import React, { useState, useEffect } from 'react';
import { API_URL } from "../../auth/constants";
import {useParams} from "react-router-dom";

//Ejemplos para la pagina mientras union
//Revisar como unir pet y user
//Ejemplos para la pagina mientras union
const petsData = [
  {
    imageURL: "./shared/EjemploPet.jpg",
    petLocation: "Bogotá",
    name: "Fluffy",
    age: 3,
    kind: "Dog",
    description: "A fluffy and friendly dog.",
  },
  {
    imageURL: "https://via.placeholder.com/150",
    petLocation: "Los Angeles",
    name: "Whiskers",
    age: 2,
    kind: "Cat",
    description: "Independent and curious",
  },
  {
    imageURL: "https://via.placeholder.com/150",
    petLocation: "Chicago",
    name: "Buddy",
    age: 5,
    kind: "Dog",
    description: "Loyal and energetic",
  },
  {
    imageURL: "https://via.placeholder.com/150",
    petLocation: "Houston",
    name: "Fluffy",
    age: 1,
    kind: "Rabbit",
    description: "Adorable and cuddly",
  },
];

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
  number_pets: 2,
};

const Profile = () => {
  const [data, setData] = useState(null); //Variable de estado para guardar los datos del usuario
  const {id}=useParams();

  useEffect(() => {
    fetch(`${API_URL}/userProfile/${id}`)
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
      <div className="mt-3 flex justify-center scrollbar">
      {data &&
        <div className="mb-8 flex flex-col sm:flex-row">
          <div className="m-6">
            <UserView
              imageURL={user.imageURL}
              name={data.nombre}
              email={data.correo}
              role={data.rol}
              username={data.username}
              number_pets={data.numMascotas}
            />
          </div>
          <div className="m-6">
            <div className="flex flex-col">
              <PetList pets={data.mascotas} />
              {/* Se ponen mas mascotas dependiendo de la cantidad de mascotas del usuario */}
            </div>
          </div>
        </div>
      }
      </div>
    </div>
  );
};

export default Profile;
