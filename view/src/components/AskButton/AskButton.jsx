import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { API_URL } from "../../auth/constants";

import Swal from "sweetalert2";

import PropTypes from "prop-types";

function AskButton({ forumId, refreshQuestions }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Función que se ejecuta al enviar el formulario
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/sendQuestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //Se envian los datos del formulario en formato JSON al servidor
          forumId,
          titulo: title,
          descripcion: description,
        }),
      });

      if (response.ok) {
        console.log("La pregunta se creó exitosamente");
        Swal.fire({
          title: "Success!",
          text: "Question added successfully",
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
      <button
        className="rounded-xl bg-white px-6 py-2 font-normal text-black lg:text-lg"
        onClick={() => setShowForm(true)}
      >
        Ask a Question
      </button>

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
