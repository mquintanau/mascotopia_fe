import { useState, useEffect, useCallback, useContext } from "react";

import QuestionList from "../components/QuestionList/QuestionList";
import Button from "../components/Button/Button";
import Blob from "../assets/Blob.png";

import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useUserLoader from "../utils/useUserLoader";
import DataContext from "../auth/DataContext";
import { API_URL } from "../auth/constants";

const QuestionView = () => {
  // Se almacena la pregunta seleccionada en la constante selectedQuestion
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { data, setData } = useContext(DataContext);
  const [forum, setForum] = useState([]);
  const [comment, setComment] = useState("");
  const { idQuestion, idForum } = useParams();

  const idUsuario = localStorage.getItem("idUser");
  const loadUser = useUserLoader(API_URL, idUsuario, setData);

  // Carga el usuario al cargar la página
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Funcion que establece la pregunta seleccionada con sus atributos de titulo y descripcion
  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleSubmitAnswer = async (event) => {
    event.preventDefault();
    // Crear FormData
    const respuesta = comment;
    const autor = data ? data.nombre : "Anonymous";
    const questionId = selectedQuestion.id;
    const fecha = new Date().toISOString();
    try {
      const response = await axios.post(`${API_URL}/sendAnswer/`, {
        questionId,
        respuesta,
        fecha,
        autor,
      });
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Answer Sent!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        setComment(""); // Limpia el campo de texto
        loadsForums(); // Recarga las preguntas
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: { error },
      });
    }
  };

  const loadsForums = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/forum/${idForum}`);
      const data = await response.json();
      setForum(data);

      console.log({ idForum });
      const defaultQuestion = data.preguntas.find(
        (pregunta) => pregunta.id == idQuestion,
      );

      if (defaultQuestion) {
        console.log(defaultQuestion);
        setSelectedQuestion(defaultQuestion);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: error.message,
      });
    }
  }, [idForum, idQuestion]);

  const confirmationDelete = (id) => {
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
        handleDeleteAnswer(id);
      }
    });
  };

  const handleDeleteAnswer = async (idAnswer) => {
    console.log("id answer", idAnswer);
    try {
      const response = await axios.delete(`${API_URL}/deleteAnswer/`, {
        data: {
          id: idAnswer,
          idForum,
          idQuestion,
          user: data,
        },
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Answer Deleted!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        loadsForums();
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: { error },
      });
    }
  };

  const Answer = ({ value }) => (
    <div key={value.id} className="mb-2 rounded-md bg-green-200 p-4">
      <h3 className="mb-2 text-sm font-bold lg:text-xl">
        Answer by: {value.autor}
      </h3>
      <p className="text-sm font-light lg:text-xl">{value.respuesta}</p>
      {data && data.correo === "admin@gmail.com" && (
        <div className="mt-2 flex w-full items-end justify-end">
          <Button
            type="button"
            className="bg-red-300"
            onClick={() => {
              confirmationDelete(value._id);
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );

  console.log(selectedQuestion);

  useEffect(() => {
    loadsForums();
  }, [loadsForums]);

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
          idForum={idForum}
          refreshQuestions={loadsForums}
        />
      </div>

      {/* Se muestra un div con la pregunta seleccionada */}
      <div className="h-screen max-h-[500px] w-full overflow-auto rounded-xl bg-gray1 p-6 lg:mr-28 lg:max-h-full lg:w-1/2">
        {/*Si existe selectedQuestion muestra un div con el formato de la pregunta al lado derecho de la lista de preguntas*/}
        {selectedQuestion && (
          <div className="flex h-full flex-col ">
            <div className="mb-4 basis-3/5 rounded-xl bg-white px-5 pb-6 pt-2 shadow-lg">
              <h3 className="mb-2 text-sm font-bold lg:text-xl">
                {selectedQuestion.titulo}
              </h3>
              <h3 className="mb-2 text-sm lg:text-xl">
                Question: {selectedQuestion.autor}
              </h3>
              <p className="mb-4 text-sm font-light lg:text-xl">
                {selectedQuestion.descripcion}
              </p>
              {selectedQuestion.respuestas &&
                selectedQuestion.respuestas.map((respuesta, index) => (
                  <Answer value={respuesta} key={index} />
                ))}
            </div>
            <div className="basis-2/5 rounded-xl bg-green5 px-5 shadow-lg">
              <form>
                <div>
                  <p className="mt-5">Add a Comment: </p>
                  <textarea
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-3  h-32 w-full rounded-xl bg-main px-4 py-2 shadow-inner"
                    placeholder="Write Here"
                  />
                </div>
                <Button
                  type="submit"
                  onClick={handleSubmitAnswer}
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
