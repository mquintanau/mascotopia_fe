import { Link } from "react-router-dom";
import QuestionList from "../components/QuestionList/QuestionList";
import { useState, useContext } from "react";
import Button from "../components/Button/Button";
import Blob from "../assets/Blob.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useUserLoader from "../utils/useUserLoader";
import DataContext from "../auth/DataContext";
import { API_URL } from "../auth/constants";

const QuestionView = () => {
  // Se almacena la pregunta seleccionada en la constante selectedQuestion
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { data, setData } = useContext(DataContext);
  const [forum, setForum] = useState([]);
  const { id, idTopic } = useParams();
  const idUsuario = localStorage.getItem("idUser");
  const loadUser = useUserLoader(API_URL, idUsuario, setData);
  // Carga el usuario al cargar la página
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  // Preguntas de prueba

  // Funcion que establece la pregunta seleccionada con sus atributos de titulo y descripcion
  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/api/forum/${idTopic}`)
      .then((response) => response.json())
      .then((data) => {
        setForum(data);
        // console.log(data.preguntas);

        const defaultQuestion = data.preguntas.filter(
          (pregunta) => pregunta.id == id,
        )[0];

        if (defaultQuestion) {
          console.log(defaultQuestion);
          setSelectedQuestion(defaultQuestion);
        }
      })
      .catch((error) =>
        // Muestra un mensaje de error si no se puede cargar el foro
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: error.message,
        }),
      );
  }, []);

  // Se retorna un div con la lista de preguntas y la pregunta seleccionada
  return (
    <div
      className="flex min-h-screen flex-col items-start p-5 lg:flex-row"
      style={{
        backgroundImage: `url(${Blob})`,
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Se muestra un div con la lista de preguntas y establece que pasa cuando se da click en Questions */}
      <div className="mb-7 h-screen max-h-[500px] w-full overflow-auto rounded-xl bg-green3 p-6 lg:ml-28 lg:max-h-full lg:w-1/2">
        <Link to="/forum">
          <h1 className="mb-3 mt-2 text-2xl hover:text-teal lg:text-4xl">
            {"<"} Questions
          </h1>
        </Link>
        <hr className="mb-5 border-black"></hr>
        <QuestionList
          questions={
            forum.preguntas && forum.preguntas.length > 0 ? forum.preguntas : ""
          }
          onQuestionSelect={handleQuestionSelect}
          data={data}
          idTopic={idTopic}
        />
      </div>

      {/* Se muestra un div con la pregunta seleccionada */}
      <div className="h-screen max-h-[500px] w-full overflow-auto rounded-xl bg-gray1 p-6 lg:mr-28 lg:max-h-full lg:w-1/2">
        {/*Si existe selectedQuestion muestra un div con el formato de la pregunta al lado derecho de la lista de preguntas*/}
        {selectedQuestion && (
          <div className="flex h-full flex-col ">
            <div className="mb-4 basis-3/5 rounded-xl bg-white px-5 pb-6 pt-2">
              <h3 className="text-sm lg:text-xl">{selectedQuestion.titulo}</h3>
              <h3 className="text-sm lg:text-xl">
                Question: {selectedQuestion.autor}
              </h3>
              <p className="text-sm font-light lg:text-xl">
                {selectedQuestion.descripcion}
              </p>
            </div>
            <div className="basis-2/5 rounded-xl bg-green5 px-5">
              <form>
                <div>
                  <p className="mt-5">Add a Comment: </p>
                  <textarea
                    type="text"
                    className="mt-3  h-32 w-full rounded-xl bg-main px-4 py-2"
                    placeholder="Write Here"
                  />
                </div>
                <Button
                  type="submit"
                  className="mx-auto mb-5 whitespace-nowrap  rounded-3xl bg-secondary px-6 py-2 font-normal"
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionView;
