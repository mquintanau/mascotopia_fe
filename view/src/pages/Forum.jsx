import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

import Input from "../components/Input/Input";
import Topic from "../components/Topic/Topic";
import QuestionList from "../components/QuestionList/QuestionList";
import Search from "../assets/Search.png";
import AskButton from "../components/AskButton/AskButton";
import Blob from "../assets/Blob.png";

// Componente que muestra el foro
function Forum() {
  // Se almacenan los foros y el id del foro actual en las siguientes constantes
  const [forums, setForums] = useState([]);
  const [shownForums, setShownForums] = useState([]);
  const [currentForumId, setCurrentForumId] = useState("");

  // Funcion que establece el foro actual
  const handleButtonClick = (forumId) => {
    setCurrentForumId(forumId);
    // coloca el foro seleccionado en primer lugar
    setShownForums((currentShownForums) =>
      currentShownForums
        .filter((forum) => forum._id === forumId)
        .concat(currentShownForums.filter((forum) => forum._id !== forumId)),
    );
  };

  const handleForumSearch = (search) => {
    setShownForums(
      forums
        .filter((forum) => forum._id === currentForumId)
        .concat(
          forums.filter(
            (forum) =>
              forum.titulo.toLowerCase().includes(search.toLowerCase()) &&
              forum._id !== currentForumId,
          ),
        ),
    );
  };

  const searchInputRef = useRef(); // Referencia al input de búsqueda

  //   Carga los foros disponibles
  useEffect(() => {
    fetch("http://localhost:4000/api/forum")
      .then((response) => response.json())
      .then((data) => {
        setForums(data);
        setShownForums(data);
        // Establece primer foro como seleccionado al cargar la pagina
        setCurrentForumId(data[0]._id);
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

  // Se retorna un div con los foros y preguntas
  return (
    // Se muestra un div con los foros y preguntas
    <div
      className="flex h-screen flex-row items-start p-5"
      style={{
        backgroundImage: `url(${Blob})`,
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Se muestra un div con los foros */}
      <div className="ml-28 h-[35rem] w-96 overflow-auto rounded-xl bg-secondary p-6">
        <h1 className="mb-3 mt-2 text-4xl">Last Topics {">"} </h1>
        <hr className="mr-[-1.5rem] border-black"></hr>
        <div className="mt-3 flex w-full flex-row items-start justify-center">
          <button
            className="mx-2 mt-8 h-5 w-5"
            onClick={() => searchInputRef.current.focus()}
          >
            <img src={Search} />
          </button>
          <Input
            type="text"
            id="search"
            label="Search Forum"
            inputClassName="rounded-md"
            labelClassName="text-black peer-focus:text-black"
            className="mt-5"
            ref={searchInputRef}
            onChange={(e) => handleForumSearch(e.target.value)}
          />
        </div>

        {/* Se muestra una lista de foros con sus titulos y se establece el currentId de la pregunta que se selecciona*/}
        <ol className="mt-0">
          {forums.length > 0 &&
            shownForums.map((forum) => (
              <li key={forum._id}>
                <Topic
                  name={forum.titulo}
                  onClick={() => handleButtonClick(forum._id)}
                  className={
                    currentForumId === forum._id ? "bg-teal text-white " : ""
                  }
                />
              </li>
            ))}
        </ol>
      </div>

      {/* Se muestra un div con las preguntas del foro seleccionado */}
      <div className="mr-28 h-[35rem] flex-grow overflow-auto rounded-xl bg-green3 p-6">
        <h1 className="mb-12 mt-2 text-4xl">
          {/* Se muestra el titulo del foro seleccionado */}
          {forums.length > 0
            ? forums.filter((forum) => forum._id === currentForumId)[0].titulo
            : ""}
        </h1>
        <QuestionList
          questions={
            // Se envian a QuestionList las preguntas del foro seleccionado y se filtran por el id del foro seleccionado
            forums.length > 0
              ? forums.filter((forum) => forum._id === currentForumId)[0]
                  .preguntas
              : ""
          }
          idTopic={currentForumId}
        />
        <div className="flex items-center justify-center">
          <AskButton forumId={currentForumId} />
        </div>
      </div>
    </div>
  );
}

export default Forum;
