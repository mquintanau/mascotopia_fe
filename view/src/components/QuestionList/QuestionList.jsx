import Question from "../Question/Question";

// Funcion que genera todas las preguntas en la lista de preguntas llamada questions
const generateQuestionViews = (
  questions,
  onQuestionSelect = () => {},
  data,
  idForum,
  refreshQuestions = () => {},
) => {
  // Si no hay preguntas, se muestra un mensaje de carga
  if (!questions) return <h1>Loading...</h1>;
  if (!data) return <h1>Loading...</h1>;
  // Se mapean todas las preguntas en la lista de preguntas
  return questions.map((question, index) => (
    // Se retorna un componente Question con los datos de cada pregunta en la lista de preguntas
    <Question
      titulo={question.titulo}
      descripcion={question.descripcion}
      index={index}
      key={index}
      onSelect={onQuestionSelect}
      idQuestion={question.id}
      autor={question.autor}
      idForum={idForum}
      correo={data.correo}
      usuario={data}
      refreshQuestions={refreshQuestions}
    />
  ));
};

// Componente que muestra una lista de preguntas
const QuestionList = ({
  questions,
  onQuestionSelect,
  data,
  idForum,
  refreshQuestions,
}) => {
  // Se retorna un div con todas las preguntas generadas por la funcion generateQuestionViews
  return (
    <div>
      {generateQuestionViews(
        questions,
        onQuestionSelect,
        data,
        idForum,
        refreshQuestions,
      )}
    </div>
  );
};

export default QuestionList;
