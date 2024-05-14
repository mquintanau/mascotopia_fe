import { useState, useEffect, useContext, useCallback, useRef } from "react";

// Componentes
import PetList from "../components/Pet/PetList/Petlist";
import UserView from "../components/User/UserView/UserView";
import Button from "../components/Button/Button";
import FormPet from "../components/FormPet/FormPet";
import profileBackground from "../assets/profileBackground.png";

// Logica de la pagina
import { API_URL } from "../auth/constants";
import DataContext from "../auth/DataContext";

// Librerias Externas
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const { data, setData } = useContext(DataContext); //Variable de estado para guardar los datos del usuario
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("+");
  const [selectedFile, setSelectedFile] = useState(null); //Variable de estado para guardar la imagen seleccionada por el usuario

  const fileInputRef = useRef();
  console.log("Renderizado de App");

  const loadUser = useCallback(async () => {
    console.log("user loading");

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
          Swal.fire({
            icon: "error",
            title: "There was an error loading the user data",
            text: { error },
          });
        });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "There was an error with the server",
        text: { error },
      });
    }
  }, [id, setData]);

  const handleButtonClick = () => {
    setShowForm((prevState) => !prevState);
    setButtonText((prevText) => (prevText === "+" ? "x" : "+"));
  };

  //Funcion para manejar el evento de subir foto de perfil
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  //Función para manejar el cambio de la imagen seleccionada por el usuario
  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Función para manejar el envío del formulario
  const handleImageSubmit = async (event) => {
    event.preventDefault();
    console.log("image submit");

    // Creacion del objeto FormData
    const formData = new FormData();

    // Agregar el archivo seleccionado al objeto FormData
    formData.append("image", selectedFile);

    // Envíar FormData al servidor
    try {
      console.log("response");
      const response = await axios.post(
        `${API_URL}/imageProfile/${id}`,
        formData,
      );
      console.log("response", response);
      // Actualizar
      setData((prevData) => ({
        ...prevData,
        imageURL: response.data.imageURL,
      }));

      console.log("sdaaaaaaaaaa");
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Image uploaded successfully",
          text: "The image was uploaded successfully",
        });
        loadUser(); // Recarga el usuario
      }
      //setData(data) => ({ ...data, imageURL: response.data.imageURL })
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: { error },
      });
    }
  };

  useEffect(() => {
    loadUser(); // Recarga el usuario al cambiar el contexto
  }, [loadUser]);

  return (
    <div
      className="min-w-screen mx-auto min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${profileBackground})` }}
    >
      <div className="mt-3 flex justify-center scrollbar">
        {data && (
          <div className="mb-8 flex flex-col items-center sm:flex-row">
            <div className="m-6">
              <UserView
                imageURL={data.imageURL}
                name={data.nombre}
                email={data.correo}
                role={data.rol}
                username={data.username}
                number_pets={data.mascotas.length}
              />
              <form
                onSubmit={handleImageSubmit}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }} // Oculta el input
                  ref={fileInputRef}
                />
                <Button
                  type="button"
                  onClick={handleFileButtonClick}
                  className="bg-primary"
                  style={{ marginRight: "5px" }}
                >
                  New Profile Picture
                </Button>
                <Button type="submit" className="bg-primary">
                  Upload
                </Button>
              </form>
            </div>
            <div className="m-6 flex flex-col">
              <PetList
                pets={data.mascotas}
                setData={setData}
                loadUser={loadUser}
              />
              {showForm && <FormPet loadUser={loadUser} usuario={data} />}{" "}
              <Button
                className="text-bold mx-auto mb-5 mt-4 w-[200px] rounded-full text-[20px] text-black"
                onClick={handleButtonClick} // Aquí se llama a la función cuando se hace clic en el botón
              >
                {buttonText}
              </Button>
              {/* Se ponen mas mascotas dependiendo de la cantidad de mascotas del usuario */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
