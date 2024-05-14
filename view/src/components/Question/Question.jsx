import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Swal from "sweetalert2";
import { API_URL } from "../../auth/constants";

// Componente que muestra una pregunta
const Question = (props) => {
  // Se almacenan las props dadas a la pregunta en las siguientes constantes
  const {
    titulo,
    descripcion,
    onSelect,
    id,
    autor,
    idTopic,
    correo,
    usuario,
    refreshQuestions = () => {},
  } = props;
  const navigate = useNavigate();
  // Se retorna un link que redirige a la vista de la pregunta con el id de la pregunta

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/deleteQuestion`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          idTopic,
          usuario,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Deleted!",
          text: "The question has been deleted.",
          icon: "success",
          confirmButtonColor: "#6FC2BD",
        });
        refreshQuestions();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmationDelete = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6FC2BD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
        // Aquí va el código para manejar la eliminación
      }
    });
  };

  return (
    <div
      className="mb-4 rounded-xl bg-white px-5 pb-6 pt-2 text-sm hover:cursor-pointer hover:bg-gray-200 lg:text-xl"
      onClick={() => {
        onSelect({ titulo, descripcion, autor });
        navigate(`/questionView/${id}/${idTopic}`);
      }}
    >
      {/* Se muestra el titulo, descripcion y autor de la pregunta */}
      <h3 className="capitalize">{titulo}</h3>
      <h3>Question: {autor}</h3>
      <p className="font-light">{descripcion}</p>
      {correo === "admin@gmail.com" && (
        <div className="mt-2 flex w-full items-end justify-end">
          <Button
            type="submit"
            className="bg-red-300"
            onClick={confirmationDelete}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Question;
