import Question from "../Question/Question";

const generateQuestionViews = (questions , onQuestionSelect) => {
    return questions.map((question, index) => (
      <Question
        name = {question.name}
        description = {question.description}
        index = {index}
        key = {index}
        onSelect = {onQuestionSelect}
      />
    ));
  };
  
  const QuestionList = ({ questions, onQuestionSelect }) => {
    return (
      <div>
        {generateQuestionViews(questions, onQuestionSelect)}
      </div>
    );
  };
  
  export default QuestionList;
