import Question from "../Question/Question";

// Funcion que genera todas las preguntas en la lista de preguntas llamada questions
const generateQuestionViews = (questions, onQuestionSelect) => {
  // Si no hay preguntas, se muestra un mensaje de carga
  if (!questions) return <h1>Loading...</h1>;
  // Se mapean todas las preguntas en la lista de preguntas
  return questions.map((question, index) => (
    // Se retorna un componente Question con los datos de cada pregunta en la lista de preguntas 
    <Question
      titulo={question.titulo}
      descripcion={question.descripcion}
      index={index}
      key={index}
      onSelect={onQuestionSelect}
      id={question._id}
      autor = {question.autor}
    />
  ));
};

// Componente que muestra una lista de preguntas
const QuestionList = ({ questions, onQuestionSelect }) => {
  // Se retorna un div con todas las preguntas generadas por la funcion generateQuestionViews
  return <div>{generateQuestionViews(questions, onQuestionSelect)}</div>;
};

export default QuestionList;
