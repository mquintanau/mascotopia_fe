import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { API_URL } from "../../auth/constants";
import Swal from "sweetalert2";
import { ChatLinesSolid } from "iconoir-react";

function AskButton({}) {
  const [showForm, setShowForm] = useState(false);

  // variables de estado formulario
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const idUsuario = localStorage.getItem("idUser");

  // Función que se ejecuta al enviar el formulario
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/post/sendPost`, {
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
          imageURL,
        }),
      });

      if (response.ok) {
        console.log("El post se creó exitosamente");
        Swal.fire({
          title: "Success!",
          text: "Post added successfully",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#4caf50",
        });
        setShowForm(false);
        refreshQuestions();
      } else {
        console.log("Hubo un error en el registro");
        const json = await response.json();
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
        className="fixed bottom-5 right-5 flex h-20 w-20 animate-fadeIn items-center justify-center overflow-hidden rounded-full bg-primary p-4 shadow-xl transition-all hover:cursor-pointer hover:bg-green-400"
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
            className="mx-5 flex w-96 flex-col gap-5 rounded-xl bg-navbar p-5 md:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <Input
                  type="text"
                  label="Publication title"
                  id="title"
                  inputClassName="rounded-xl"
                  maxLength={30}
                  onChange={(e) => setTitle(e.target.value)}
                  required={true}
                />
                <p className="mt-5">Add a Description: </p>
                <textarea
                  type="text"
                  className="mt-3  h-32 w-full rounded-xl bg-main px-4 py-2"
                  placeholder="Write Here"
                  maxLength={200}
                  onChange={(e) => setDescription(e.target.value)}
                  required={true}
                />
              </div>
              <div className="mt-2 flex justify-center">
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

AskButton.propTypes = {
  forumId: PropTypes.string.isRequired,
  refreshQuestions: PropTypes.func.isRequired,
};

export default AskButton;
