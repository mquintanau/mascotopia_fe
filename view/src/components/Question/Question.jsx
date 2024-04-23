import React from "react";
import { Link } from "react-router-dom";

const Question = (props) => {
  const { titulo, descripcion, onSelect, id } = props;
  return (
    <Link to={`/questionView/${id}`}>
      <div
        className="mb-4 rounded-xl bg-white px-5 pb-6 pt-2 hover:bg-gray-200"
        onClick={() => onSelect({ titulo, descripcion })}
      >
        <h3>{titulo}</h3>
        <h3>Question: ...</h3>
        <p className="font-light">{descripcion}</p>
      </div>
    </Link>
  );
};

export default Question;
