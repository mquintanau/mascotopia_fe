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

const LostPets = () => {
  const [lostPetsData, setLostPetsData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [nombre, setNombre] = useState("");
  const [vistoPorUltimaVez, setVistoPorUltimaVez] = useState("");
  const [respondeA, setRespondeA] = useState("");
  const [accesorios, setAccesorios] = useState("");
  const [infoContacto, setInfoContacto] = useState("");

  const loadPets = () => {
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
  };

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  const fileInputRef = useRef();
  const idUsuario = localStorage.getItem("idUser");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Se envía la imagen al servidor
      // Crear un objeto FormData y añadir el archivo
      const formData = new FormData();
      formData.append("image", imageFile);

      // Hacer una solicitud HTTP para subir el archivo

      const responseImage = await fetch(
        `${API_URL}/lostPets/sendImage/${idUsuario}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!responseImage.ok) {
        Swal.fire({
          title: "¡Error!",
          text: "Error uploading the image",
          icon: "error",
          confirmButtonText: "Continue",
          confirmButtonColor: "#f27474",
        });
      }

      const data = await responseImage.json();
      console.log(data);

      if (data.imageURL) {
        const responsePost = await fetch(`${API_URL}/lostPets/sendPet`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //Se envian los datos del formulario en formato JSON al servidor
            nombre,
            vistoPorUltimaVez,
            respondeA,
            accesorios,
            infoContacto,
            imageURL: data.imageURL,
            idUsuario,
          }),
        });

        if (responsePost.ok) {
          console.log("El post se creó exitosamente");
          Swal.fire({
            title: "Success!",
            text: "Pet added successfully",
            icon: "success",
            confirmButtonText: "Continue",
            confirmButtonColor: "#4caf50",
          });
          loadPets();
        } else {
          console.log("Hubo un error en el registro");
          const json = await responsePost.json();
          if (json && json.body && typeof json.body.error === "string") {
            // json tiene la estructura de AuthResponseError
            if (json.body.error) {
              Swal.fire({
                title: "¡Error!",
                text: json.body.error,
                icon: "error",
                confirmButtonText: "Continue",
                confirmButtonColor: "#f27474",
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "¡Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
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
        <div className="flex h-fit w-[65%] flex-row flex-wrap items-center justify-center">
          {/* Seccion ver mascotas perdidas */}
          <h3 className="mb-5 w-full text-center text-xl">
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
            onSubmit={handleSubmit}
          >
            <p>
              Don’t worry, we’re here to help. Fill with helpful information so
              others can find them:
            </p>
            <p className="mt-3 w-full text-left">Add a recent picture:</p>
            <div
              className="relative mt-5 h-[150px] w-[150px] rounded-lg bg-background hover:cursor-pointer hover:bg-neutral-200"
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
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <p className="my-4 w-full">Add your pet&#39;s information: </p>
            <Input
              label="Name"
              className="my-4"
              maxLength={30}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required={true}
            />
            <Input
              label="Last Seen In"
              className="my-4"
              maxLength={30}
              value={vistoPorUltimaVez}
              onChange={(e) => setVistoPorUltimaVez(e.target.value)}
              required={true}
            />
            <Input
              label="Responds to"
              className="my-4"
              maxLength={30}
              value={respondeA}
              onChange={(e) => setRespondeA(e.target.value)}
              required={true}
            />
            <Input
              label="Accesories"
              className="my-4"
              maxLength={30}
              value={accesorios}
              onChange={(e) => setAccesorios(e.target.value)}
              required={true}
            />
            <Input
              label="Contact Information"
              className="my-4"
              maxLength={200}
              value={infoContacto}
              onChange={(e) => setInfoContacto(e.target.value)}
              required={true}
            />
            <Button className="bg-secondary">Send</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LostPets;
