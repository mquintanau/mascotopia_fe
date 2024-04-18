import Question from "../Question/Question";

const generateQuestionViews = (questions) => {
    return questions.map((question, index) => (
      <Question
        name = {question.name}
        description = {question.description}
        key = {index}
      />
    ));
  };
  
  const QuestionList = ({ questions }) => {
    return (
      <div>
        {generateQuestionViews(questions)}
      </div>
    );
  };
  
  export default QuestionList;
