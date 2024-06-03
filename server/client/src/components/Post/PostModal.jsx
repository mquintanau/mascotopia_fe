import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { API_URL } from "../../auth/constants";
import { ChatLinesSolid, InfoCircle, Plus } from "iconoir-react";
import Swal from "sweetalert2";

function AskButton({ loadPosts }) {
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // variables de estado formulario
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

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

    try {
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
      console.log(data);

      if (data.imageURL) {
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
            imageURL: data.imageURL,
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
          <div
            className="mx-5 flex flex-col gap-5 rounded-xl bg-navbar p-5 md:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-row flex-wrap justify-center"
            >
              <div className="flex w-[40%] max-w-[320px] flex-col">
                <p>Publication Type:</p>
                <div className="mb-7 mt-2 flex flex-row items-center justify-center">
                  <label className="mr-4 flex flex-row justify-center">
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

                  <label className="flex flex-row justify-center">
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

                <Input
                  type="text"
                  label="Publication title"
                  id="title"
                  inputClassName="rounded-xl"
                  maxLength={30}
                  onChange={(e) => setTitulo(e.target.value)}
                  required={true}
                />

                <label className="mt-5" htmlFor="description">
                  Add a Description:{" "}
                </label>
                <textarea
                  type="text"
                  className="mt-3  h-32 w-full rounded-xl bg-main px-4 py-2"
                  placeholder="Write Here"
                  maxLength={200}
                  onChange={(e) => setDescription(e.target.value)}
                  required={true}
                  id="description"
                />
              </div>

              <div className="mx-14 my-auto mr-4 h-[300px] w-[2px] bg-green-800 opacity-40"></div>

              <div className="flex w-[40%] max-w-[320px] flex-col items-center justify-center">
                <label htmlFor="fileInput" className="">
                  Photo:
                </label>
                <div
                  className="relative mt-5 h-[70%] max-h-[300px] w-[70%] max-w-[300px] rounded-lg bg-background"
                  onClick={handleFileButtonClick}
                >
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleImageChange}
                    className="hidden" // Oculta el input
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
              </div>

              <div className="mt-7 flex w-full flex-row justify-center">
                <Button
                  type="button"
                  className="mr-3 bg-red-400 hover:bg-black hover:text-red-400"
                  onClick={() => setShowForm(false)}
                >
                  Close
                </Button>
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

AskButton.propTypes = {};

export default AskButton;
