import Input from "../components/Input/Input";
import { useState, useEffect } from "react";
import Topic from "../components/Topic/Topic";
import QuestionList from "../components/QuestionList/QuestionList";
import Search from "../assets/Search.png";
import Form from "../components/Form/Form";
import Blob from "../assets/Blob.png";
import Swal from "sweetalert2";

// Lista de preguntas de prueba
const questionTest = [
  {
    name: "Pablo",
    description: "Hola, como estas?",
  },
  {
    name: "Juan",
    description: "Bien, gracias y tu?",
  },
  {
    name: "Pablo",
    description: "Bien, gracias",
  },
  {
    name: "Pablo",
    description: "Bien, gracias",
  },
];

// Componente que muestra el foro
function Forum() {
  // Se almacenan los foros y el id del foro actual en las siguientes constantes
  const [forums, setForums] = useState([]);
  const [currentForumId, setCurrentForumId] = useState(undefined);

  // Funcion que establece el foro actual
  const handleButtonClick = (forumId) => {
    setCurrentForumId(forumId);
    console.log(forumId);
  };

  //   Carga los foros disponibles
  useEffect(() => {
    fetch("http://localhost:4000/api/forum")
      .then((response) => response.json())
      .then((data) => {
        setForums(data);
        // Establece primer foro como seleccionado al cargar la pagina
        setCurrentForumId(data[0]._id);
        console.log("primer id de un foro:", data[0]._id);
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
        <div className="mt-3 flex w-full flex-row items-start">
          <button className="mx-2 h-5 w-5 translate-y-3.5">
            <img src={Search} />
          </button>
          <Input
            type="text"
            id="search"
            label="Search Forum"
            inputClassName="py-0 rounded-md"
            labelClassName="translate-y-[-35%]"
          />
        </div>

        {/* Se muestra una lista de foros con sus titulos y se establece el currentId de la pregunta que se selecciona*/}
        <ol className="mt-0">
          {forums.length > 0 &&
            forums.map((forum) => (
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
          //TODO: Agregar función para seleccionar pregunta y que no salga error.
        />
        <div className="flex items-center justify-center">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default Forum;
