import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { API_URL } from "../../auth/constants";
import { ChatLinesSolid, InfoCircle, Plus, Camera } from "iconoir-react";
import Swal from "sweetalert2";

function AskButton({ loadPosts }) {
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // variables de estado formulario
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescription] = useState("");

  const idUsuario = localStorage.getItem("idUser");

  const fileInputRef = useRef();

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

  // Función que se ejecuta al enviar el formulario
  async function handleSubmit(e) {
    e.preventDefault();

    let image = null;

    try {
      if (imageFile) {
        // Se envía la imagen al servidor
        // Crear un objeto FormData y añadir el archivo
        const formData = new FormData();
        formData.append("image", imageFile);

        // Hacer una solicitud HTTP para subir el archivo

        const responseImage = await fetch(
          `${API_URL}/post/sendImage/${idUsuario}`,
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
        image = data.imageURL;
      }

      if (image || !imageFile) {
        const responsePost = await fetch(`${API_URL}/post/sendPost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //Se envian los datos del formulario en formato JSON al servidor
            idUsuario,
            titulo,
            tipo,
            descripcion,
            imageURL: image,
          }),
        });

        if (responsePost.ok) {
          console.log("El post se creó exitosamente");
          Swal.fire({
            title: "Success!",
            text: "Post added successfully",
            icon: "success",
            confirmButtonText: "Continue",
            confirmButtonColor: "#4caf50",
          });
          setShowForm(false);
          setImageFile(null);
          setPreviewImage(null);
          loadPosts();
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

  return (
    <>
      <div
        className="fixed bottom-5 right-5 flex h-16 w-16 animate-fadeIn items-center justify-center overflow-hidden rounded-full bg-primary p-4 shadow-xl transition-all hover:cursor-pointer hover:bg-green-400 md:h-20 md:w-20"
        title="Create a post"
        onClick={() => setShowForm(true)}
      >
        <ChatLinesSolid
          className="animate-fadeIn  text-neutral-700 "
          fontSize={45}
        />
      </div>

      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur hover:cursor-pointer"
          onClick={() => setShowForm(false)}
        >
          <form
            className="flex h-[400px] w-[400px] translate-y-[25px] flex-col items-center justify-center gap-5 overflow-x-hidden overflow-y-scroll rounded-xl bg-navbar py-2 outline outline-2 outline-black md:h-fit md:w-fit md:flex-row md:flex-wrap"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Publicacion */}
            <div className="mt-[300px] flex w-full max-w-[320px] flex-col md:mt-0 md:w-[40%] md:pl-6">
              <div className="flex w-full flex-row items-center justify-center p-8">
                <p className="mr-7">Publication Type:</p>
                <div className="flex flex-col items-center justify-center rounded-lg bg-main p-4 shadow-lg">
                  <label className="mb-2 flex flex-row justify-center">
                    <input
                      type="radio"
                      name="Tipo"
                      id="featured"
                      value="featured"
                      onChange={(e) => setTipo(e.target.value)}
                      required={true}
                      className="mr-2"
                    />
                    Featured
                    <div title="Nice photos of your pets">
                      <InfoCircle
                        strokeWidth={2.5}
                        fontSize={14}
                        className="ml-1 translate-y-[2px]"
                      />
                    </div>
                  </label>

                  <label className="flex w-full flex-row justify-center">
                    <input
                      type="radio"
                      name="Tipo"
                      id="local"
                      value="local"
                      onChange={(e) => setTipo(e.target.value)}
                      required={true}
                      className="mr-2"
                    />
                    Local
                    <div title="Questions & Local News">
                      <InfoCircle
                        strokeWidth={2.5}
                        fontSize={14}
                        className="ml-1 translate-y-[2px]"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col px-4 md:p-0">
                <Input
                  type="text"
                  label="Publication title"
                  id="title"
                  inputClassName="rounded-xl"
                  maxLength={100}
                  onChange={(e) => setTitulo(e.target.value)}
                  required={true}
                  className="rounded-lg shadow-lg md:mx-0"
                />

                <Input
                  textArea={true}
                  className="mt-6 h-20 w-full rounded-xl bg-main shadow-lg"
                  inputClassName="h-full p-0"
                  placeholder="Write Here"
                  maxLength={200}
                  onChange={(e) => setDescription(e.target.value)}
                  required={true}
                  label="Add a Description"
                />
              </div>
            </div>

            {/* Barra */}
            <div className="mx-14 my-auto mr-4 hidden h-[300px] w-[2px] bg-green-800 opacity-40 md:block"></div>

            {/* foto */}
            <div className="flex w-full max-w-[320px] flex-col items-center justify-center md:ml-7 md:w-[40%]">
              <label htmlFor="fileInput" className="">
                Photo:
              </label>
              <div
                className="relative mt-5 flex aspect-square h-full max-h-[200px] w-full max-w-[200px] items-center justify-center rounded-lg bg-background outline outline-2 transition-all hover:cursor-pointer hover:bg-neutral-200"
                onClick={handleFileButtonClick}
              >
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImageChange}
                  className="hidden" // Oculta el input
                  ref={fileInputRef}
                />
                <div className="absolute right-0 top-0 flex h-[40px] w-[40px] -translate-y-3 translate-x-3 items-center justify-center rounded-full bg-secondary outline outline-2">
                  <Plus fontSize={50} />
                </div>
                <Camera fontSize={70} />

                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            </div>

            {/* Botontes */}
            <div className="flex w-full flex-row justify-center pb-6">
              <Button
                type="button"
                className="mr-3 max-h-[40px] bg-red-400 hover:bg-black hover:text-red-400"
                onClick={() => setShowForm(false)}
              >
                Close
              </Button>
              <Button type="submit" className="max-h-[40px]">
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

AskButton.propTypes = {};

export default AskButton;
