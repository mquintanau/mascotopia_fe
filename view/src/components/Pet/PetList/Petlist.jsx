import PetView from "../PetView/PetView";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import { useState, useRef } from "react";
import { API_URL } from "../../../auth/constants";
import axios from "axios";

const generatePetViews = (pets) => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null); //Variable de estado para guardar la imagen seleccionada por el usuario

  const handleFileButtonClick = () => {
   fileInputRef.current.click();
  };

  //Función para manejar el cambio de la imagen seleccionada por el usuario
  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Función para manejar el envío del formulario
  const handleImageSubmit = async (event, id) => {
    event.preventDefault();

    // Creacion del objeto FormData
    const formData = new FormData();

    // Agregar el archivo seleccionado al objeto FormData
    formData.append("image", selectedFile);

    // Envíar FormData al servidor
    try {
      const response = await axios.post(
        `${API_URL}/imageProfile/pet/${id}`,
        formData,
      );
      // Actualizar
      setData((prevData) => ({
        ...prevData,
        imageURL: response.data.imageURL,
      }));
      loadUser();
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


  return pets.map((pet, index) => (
    <div key={index} > 
      <PetView 
        pet={pet} 
        imageURL={pet.imageURL}
        petName={pet.nombreMascota}
        animalPet={pet.animal}
        petAge={Number(pet.edad)}
        petDescription={pet.descripcion}
      />
      <form onSubmit={(event) => handleImageSubmit(event, pet._id)} style={{ display: 'flex', justifyContent: 'center', marginTop: '-14px' }}>
      <input 
       type="file" 
       id="fileInput" 
       onChange={handleImageChange} 
       style={{ display: 'none' }} // Oculta el input
       ref={fileInputRef}
      />
      <Button 
       onClick={handleFileButtonClick}
       className="bg-primary" 
       style={{marginRight: '5px'}}
      >
        New Pet Picture
      </Button>
      <Button type="submit" className="bg-primary" >Upload</Button>
    </form>
    </div>
    ),
  );
};

const PetList = ({ pets }) => {
  if (pets.animal !== "") {
    return <div>{generatePetViews(pets)}</div>;
  }
};

PetList.propTypes = {
  pets: PropTypes.array.isRequired,
};

export default PetList;
