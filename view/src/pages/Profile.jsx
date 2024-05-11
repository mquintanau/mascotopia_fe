import { useState, useEffect, useContext, useCallback } from "react";

// Componentes
import PetList from "../components/Pet/PetList/Petlist";
import UserView from "../components/User/UserView/UserView";
import Button from "../components/Button/Button";
import FormPet from "../components/FormPet/FormPet";

// Logica de la pagina
import { API_URL } from "../auth/constants";
import DataContext from "../auth/DataContext";

// Librerias Externas
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

//Ejemplos para la pagina mientras union
//Revisar como unir pet y user
//Ejemplos para la pagina mientras union
// const petsData = [
//   {
//     imageURL: "./shared/EjemploPet.jpg",
//     petLocation: "Bogotá",
//     name: "Fluffy",
//     age: 3,
//     kind: "Dog",
//     description: "A fluffy and friendly dog.",
//   },
//   {
//     imageURL: "https://via.placeholder.com/150",
//     petLocation: "Los Angeles",
//     name: "Whiskers",
//     age: 2,
//     kind: "Cat",
//     description: "Independent and curious",
//   },
//   {
//     imageURL: "https://via.placeholder.com/150",
//     petLocation: "Chicago",
//     name: "Buddy",
//     age: 5,
//     kind: "Dog",
//     description: "Loyal and energetic",
//   },
//   {
//     imageURL: "https://via.placeholder.com/150",
//     petLocation: "Houston",
//     name: "Fluffy",
//     age: 1,
//     kind: "Rabbit",
//     description: "Adorable and cuddly",
//   },
// ];

// const user = {
//   name: "AAAaaaA css",
//   email: "aaa@gmail.com",
//   username: "aa123",
//   role: "Volunteer",
//   imageURL: "/shared/EjemploImagenUsuario.jpg",
//   user_id: 20,
//   birthday: "1990-06-15",
//   contact_number: 1111111111,
//   description: ":3",
//   number_pets: 2,
// };

const Profile = () => {
  const { data, setData } = useContext(DataContext); //Variable de estado para guardar los datos del usuario
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("+");
  const [selectedFile, setSelectedFile] = useState(null); //Variable de estado para guardar la imagen seleccionada por el usuario
  console.log("Renderizado de App");

  const loadUser = useCallback(async () => {
    try {
      fetch(`${API_URL}/userProfile/${id}`)
        .then((response) => response.json()) //Convierte la respuesta a un objeto JSON
        .then((data) => {
          //Con los datos obtenidos se hace lo siguiente
          // Aquí puedes utilizar los datos que recibiste
          setData(data); //Imprime en consola los datos obtenidos
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.alert({
            icon: "error",
            title: "There was an error loading the user data",
            text: { error },
          });
        });
    } catch (error) {
      console.error("Error:", error);
      Swal.alert({
        icon: "error",
        title: "There was an error with the server",
        text: { error },
      });
    }
  }, [id, setData]);

  useEffect(() => {
    loadUser(); // Recarga el usuario al cambiar el contexto
  }, [loadUser]);

  const handleButtonClick = () => {
    setShowForm((prevState) => !prevState);
    setButtonText((prevText) => (prevText === "+" ? "x" : "+"));
  };

  //Función para manejar el cambio de la imagen seleccionada por el usuario
  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Función para manejar el envío del formulario
  const handleImageSubmit = async (event) => {
    event.preventDefault();

    // Creacion del objeto FormData
    const formData = new FormData();

    // Agregar el archivo seleccionado al objeto FormData
    formData.append("image", selectedFile);

    // Envíar FormData al servidor
    try {
      const response = await axios.post(
        `${API_URL}/imageProfile/${id}`,
        formData,
      );
      // Actualizar
      setData((prevData) => ({
        ...prevData,
        imageURL: response.data.imageURL,
      }));

      console.log("Response:", response);
      if (response) {
        Swal.alert({
          icon: "success",
          title: "Image uploaded successfully",
          text: "The image was uploaded successfully",
        });
        loadUser(); // Recarga el usuario
      }
      //setData(data) => ({ ...data, imageURL: response.data.imageURL })
    } catch (error) {
      console.error("Error:", error);
      Swal.alert({
        icon: "error",
        title: "Error",
        text: { error },
      });
    }
  };

  return (
    <div
      className="mx-auto my-10 max-w-screen-xl"
      style={{ backgroundImage: "url('public/shared/DecorationLine.svg')" }}
    >
      <div className="mt-3 flex justify-center scrollbar">
        {data && (
          <div className="mb-8 flex flex-col sm:flex-row">
            <div className="m-6">
              <UserView
                imageURL={data.imageURL}
                name={data.nombre}
                email={data.correo}
                role={data.rol}
                username={data.username}
                number_pets={data.mascotas.length}
              />
            </div>
            <div className="m-6">
              <div className="flex flex-col">
                <PetList pets={data.mascotas} />
                {showForm && <FormPet loadUser={loadUser} />}{" "}
                <Button
                  className="text-bold mx-auto mb-5 w-[200px] rounded-full text-[20px] text-black"
                  onClick={handleButtonClick} // Aquí se llama a la función cuando se hace clic en el botón
                >
                  {buttonText}
                </Button>
                {/* Se muestra el formulario si showForm es true */}
                {/* Se ponen mas mascotas dependiendo de la cantidad de mascotas del usuario */}
                <form onSubmit={handleImageSubmit}>
                  <input type="file" onChange={handleImageChange} />
                  <button type="submit">Upload New Profile Image</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
