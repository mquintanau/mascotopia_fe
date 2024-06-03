import { useEffect, useState, useRef } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import LostPetCard from "../components/LostPetCard/LostPetCard";
import { Plus } from "iconoir-react";
import Swal from "sweetalert2";
import { API_URL } from "../auth/constants";

// const lostPetsData = [
//   {
//     _id: "1",
//     nombre: "Buddy",
//     vistoPorUltimaVez: "Central Park, New York",
//     respondeA: "Bud",
//     accesorios: "Red collar",
//     infoContacto: "555-1234",
//     imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
//     comentarios: [
//       {
//         author: "John Doe",
//         text: "I saw a dog like Buddy near the playground.",
//       },
//       {
//         author: "Jane Smith",
//         text: "Hope you find him soon!",
//       },
//     ],
//     numComentarios: 2,
//   },

const LostsPets = () => {
  const [lostPetsData, setLostPetsData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/lostPets/getPets`)
      .then((response) => response.json())
      .then((data) => {
        setLostPetsData(data);
      })
      .catch((error) =>
        // Muestra un mensaje de error si no se pueden cargar los foros
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          description: error,
        }),
      );
  }, []);

  const fileInputRef = useRef();
  const idUsuario = localStorage.getItem("idUser");

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

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));

      // Crear un objeto FormData y añadir el archivo
      const formData = new FormData();
      formData.append("image", file);

      // Hacer una solicitud HTTP para subir el archivo
      try {
        const response = await fetch(
          `${API_URL}/lostPets/sendImage/${idUsuario}`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <section className="min-h-screen w-screen justify-center">
      <h2 className="m-10 mr-0 w-full pt-10 text-center text-4xl font-semibold">
        🐶 Losts Pets
      </h2>
      <div className="my-10 flex flex-row">
        <div className="flex w-[65%] flex-row flex-wrap items-center justify-center">
          {/* Seccion ver mascotas perdidas */}
          <h3 className="w-full text-center text-xl">
            Have you seen these pets?
          </h3>
          {lostPetsData === null ? (
            <h1 className="mt-[-400px]">Loading...</h1>
          ) : lostPetsData.length === 0 ? (
            <h1 className="mt-[-400px]">No lost pets found</h1>
          ) : (
            lostPetsData.map((pet) => <LostPetCard key={pet._id} pet={pet} />)
          )}
        </div>
        <div className="mr-10 w-[35%] rounded-md">
          {/* Formulario mascota perdida */}
          <h3 className="mb-10 w-full text-center text-xl">
            Have you lost your pet?
          </h3>
          <form
            action=""
            className="flex flex-col items-center rounded-lg bg-primary p-4 text-left"
          >
            <p>
              Don’t worry, we’re here to help. Fill with helpful information so
              others can find them:
            </p>
            <p className="mt-3 w-full text-left">Add a recent picture:</p>
            <div
              className="bg-background relative mt-5 h-[150px] w-[150px] rounded-lg"
              onClick={handleFileButtonClick}
            >
              <input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                style={{ display: "none" }} // Oculta el input
                ref={fileInputRef}
              />
              <div className="absolute right-0 flex h-[40px] w-[40px] -translate-y-3 translate-x-3 items-center justify-center rounded-full bg-secondary">
                <Plus fontSize={50} />
              </div>
              {previewImage && <img src={previewImage} alt="Preview" />}
            </div>
            <p className="my-4 w-full">Add your pet&#39;s information: </p>
            <Input label="Last Seen" className="my-4" />
            <Input label="Responds to" className="my-4" />
            <Input label="Accesories" className="my-4" />
            <Input label="Commentary" className="my-4" />
            <Input label="Contact Information" className="my-4" />
            <Button className="bg-secondary">Send</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LostsPets;
