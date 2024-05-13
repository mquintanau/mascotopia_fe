import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

// Componente que muestra una pregunta
const Question = (props) => {
  // Se almacenan las props dadas a la pregunta en las siguientes constantes
  const { titulo, descripcion, onSelect, id, autor, idTopic, correo } = props;
  const navigate = useNavigate();
  // Se retorna un link que redirige a la vista de la pregunta con el id de la pregunta
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
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete");
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Question;
