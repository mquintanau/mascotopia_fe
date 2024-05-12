import { useState, useEffect, useRef, useContext } from "react";
import Swal from "sweetalert2";

import Input from "../components/Input/Input";
import Topic from "../components/Topic/Topic";
import QuestionList from "../components/QuestionList/QuestionList";
import Search from "../assets/Search.png";
import Filter from "../assets/Filter.png";
import AskButton from "../components/AskButton/AskButton";
import Blob from "../assets/Blob.png";
import useUserLoader from "../utils/useUserLoader";
import { API_URL } from "../auth/constants";
import DataContext from "../auth/DataContext";

// Componente que muestra el foro
function Forum() {
  // Se almacenan los foros y el id del foro actual en las siguientes constantes

  const [forums, setForums] = useState([]);
  const [shownForums, setShownForums] = useState([]);
  const [shownFilters, setShownFilters] = useState(false);
  const [currentForumId, setCurrentForumId] = useState("");
  const id = localStorage.getItem("idUser");
  const { data, setData } = useContext(DataContext);
  const [isSortByPosts, setIsSortByPosts] = useState(false);
  const [isAlphabeticalOrder, setIsAlphabeticalOrder] = useState(false);
  const loadUser = useUserLoader(API_URL, id, setData);
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    console.log("Entro");
    handleForumSearch(searchInputRef.current.value);
  }, [isSortByPosts, isAlphabeticalOrder, currentForumId]); // Se ejecuta cada vez que `isSortByPosts` cambia

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
    let result = forums
      .filter((forum) => forum._id === currentForumId)
      .concat(
        forums.filter(
          (forum) =>
            forum.titulo.toLowerCase().includes(search.toLowerCase()) &&
            forum._id !== currentForumId,
        ),
      );

    let firstForum = result[0];
    let restOfList = result.slice(1);

    if (isSortByPosts) {
      restOfList = restOfList.sort((a, b) => b.numPreguntas - a.numPreguntas);
    }

    if (isAlphabeticalOrder) {
      restOfList = restOfList.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    result = [firstForum, ...restOfList];
    setShownForums(result);
  };
  const refreshQuestions = () => {
    fetch("http://localhost:4000/api/forum")
      .then((response) => response.json())
      .then((data) => {
        setForums(data);
        handleButtonClick(currentForumId);
      });
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
      className="flex min-h-screen flex-col items-start p-5 lg:flex-row"
      style={{
        backgroundImage: `url(${Blob})`,
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Se muestra un div con los foros */}
      <div className="mb-7 h-screen max-h-[400px] w-full overflow-auto rounded-xl bg-secondary p-6 lg:ml-28 lg:max-h-full lg:w-[35rem]">
        <h1 className="mb-3 mt-2 text-2xl lg:text-4xl">Last Topics {">"} </h1>
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
          <button
            className="mx-3 mt-7 h-7 w-7 items-center justify-center hover:rounded-xl hover:bg-green2 "
            onClick={() => setShownFilters(!shownFilters)}
          >
            <img src={Filter} />
          </button>
        </div>

        {shownFilters && (
          <div className="mb-3 mt-3 flex flex-col items-center justify-center rounded-xl bg-main ">
            <h2 className="w-full bg-green3 text-center">Filter by...</h2>
            <ul className="w-full">
              <li>
                <button
                  className={`flex h-10 w-full items-center justify-center text-center hover:bg-green1 ${isAlphabeticalOrder ? "bg-gray-300 text-gray-600" : ""} ${isSortByPosts ? "bg-green-300 text-black" : ""}`}
                  onClick={() => {
                    setIsSortByPosts(!isSortByPosts);
                    setIsAlphabeticalOrder(false);
                  }}
                  disabled={isAlphabeticalOrder}
                >
                  Number of publications
                </button>
              </li>
              <hr className="bg-gray h-[2px] w-full"></hr>
              <li>
                <button
                  className={`flex h-10 w-full items-center justify-center rounded-bl-xl rounded-br-xl text-center hover:bg-green1 ${isSortByPosts ? "bg-gray-300 text-gray-600" : ""} ${isAlphabeticalOrder ? "bg-green-300 text-black" : ""}`}
                  onClick={() => {
                    setIsAlphabeticalOrder(!isAlphabeticalOrder);
                    setIsSortByPosts(false);
                  }}
                  disabled={isSortByPosts}
                >
                  Alphabetical order
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Se muestra una lista de foros con sus titulos y se establece el currentId de la pregunta que se selecciona*/}
        <ol className="mt-0">
          {forums.length > 0 &&
            shownForums.map((forum) => (
              <li key={forum._id}>
                <Topic
                  name={forum.titulo}
                  onClick={() => {
                    handleButtonClick(forum._id);
                  }}
                  className={
                    currentForumId === forum._id
                      ? "my-2 bg-teal text-sm text-white lg:text-2xl"
                      : "my-2 text-sm lg:text-2xl"
                  }
                />
              </li>
            ))}
        </ol>
      </div>

      {/* Se muestra un div con las preguntas del foro seleccionado */}
      <div className="h-screen max-h-[500px] w-full overflow-auto rounded-xl bg-green3 p-6 lg:mr-28 lg:max-h-full lg:flex-grow ">
        <h1 className="mb-2 mt-2 text-2xl lg:text-4xl">
          {/* Se muestra el titulo del foro seleccionado */}
          {forums.length > 0
            ? forums.filter((forum) => forum._id === currentForumId)[0].titulo
            : ""}
        </h1>

        <h2 className="mb-4 text-xl lg:text-xl">
          {"Number of questions: "}
          {forums.length > 0
            ? forums.filter((forum) => forum._id === currentForumId)[0]
                .numPreguntas
            : ""}
        </h2>
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
          <AskButton
            data={data}
            forumId={currentForumId}
            refreshQuestions={refreshQuestions}
          />
        </div>
      </div>
    </div>
  );
}

export default Forum;
