import Question from "../Question/Question";

const generateQuestionViews = (questions, onQuestionSelect) => {
  if (!questions) return <h1>Loading...</h1>;
  return questions.map((question, index) => (
    <Question
      titulo={question.titulo}
      descripcion={question.descripcion}
      index={index}
      key={index}
      onSelect={onQuestionSelect}
      id={question._id}
    />
  ));
};

const QuestionList = ({ questions, onQuestionSelect }) => {
  return <div>{generateQuestionViews(questions, onQuestionSelect)}</div>;
};

export default QuestionList;
