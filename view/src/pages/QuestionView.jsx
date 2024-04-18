import { Link } from 'react-router-dom';
import QuestionList from '../components/QuestionList/QuestionList';
import { useState } from 'react';
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'


const QuestionView = () => {
  const [selectedQuestion , setSelectedQuestion] = useState(null);
  const questionTest = [
    {
    name : "Pablo",
    description : "Hola, como estas?"
    },
    {
    name : "Juan",
    description : "Bien, gracias y tu?"
    },
    {
    name : "Pablo",
    description : "Bien, gracias"    
    },
    {
        name : "Pablo",
        description : "Bien, gracias"    
    },
];

const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className=" flex flex-row items-start h-screen p-5">
      <div className="bg-green3 p-6 rounded-xl h-[35rem] ml-28 w-[40rem] overflow-auto">
      <Link to="/forum">
        <h1 className="text-4xl mt-2 mb-3 hover:text-teal">{'<'} Questions</h1>
      </Link>
      <hr className="border-black mb-5"></hr>
      <QuestionList questions={questionTest} onQuestionSelect={handleQuestionSelect} />
      </div>

      <div  className="bg-gray1 p-6 rounded-xl flex-grow h-[35rem] mr-28 overflow-auto"  >
        {selectedQuestion && (
          <div className='flex flex-col h-full '> {/* Este es el nuevo elemento padre */}
            <div className="bg-white mb-4 rounded-xl px-5 pb-6 pt-2 basis-3/5">
              <h3>{selectedQuestion.name}</h3>
              <h3>Question:   ...</h3>
              <p className="font-light">{selectedQuestion.description}</p>
            </div>
            <div className="bg-green5 rounded-xl basis-2/5 px-5">
            <form>
              <div>
                <p className='mt-5'>Add a Comment: </p>
                <textarea type="text" className='mt-3  h-32 rounded-xl w-full py-2 px-4 bg-main' placeholder='Write Here' />
              </div>
              <Button type="submit" className="mx-auto mb-5 whitespace-nowrap  px-6 py-2 bg-secondary rounded-3xl font-normal">
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