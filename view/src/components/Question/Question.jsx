import React from "react";
import { Link } from "react-router-dom";

// Componente que muestra una pregunta
const Question = (props) => {
  // Se almacenan las props dadas a la pregunta en las siguientes constantes
  const { titulo, descripcion, onSelect, id, autor, idTopic } = props;

  // Se retorna un link que redirige a la vista de la pregunta con el id de la pregunta
  return (
    <Link to={`/questionView/${id}/${idTopic}`}>
      <div
        className="mb-4 rounded-xl bg-white px-5 pb-6 pt-2 text-sm hover:cursor-pointer hover:bg-gray-200 lg:text-xl"
        // Se llama a la funcion onSelect con el titulo y descripcion de la pregunta
        onClick={() => onSelect({ titulo, descripcion, autor })}
      >
        {/* Se muestra el titulo, descripcion y autor de la pregunta */}
        <h3 className="capitalize">{titulo}</h3>
        <h3>Question: {autor}</h3>
        <p className="font-light">{descripcion}</p>
      </div>
    </Link>
  );
};

export default Question;
