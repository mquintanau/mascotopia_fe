import { Link } from 'react-router-dom';
const QuestionView = () => {
  return (
    <div className=" flex flex-row items-start h-screen p-5">
      <div className="bg-green3 p-6 rounded-xl h-[35rem] ml-28 w-[40rem] overflow-auto">
      <Link to="/forum">
        <h1 className="text-4xl mt-2 mb-3 hover:text-teal">{'<'} Questions</h1>
      </Link>
      <hr className="border-black"></hr>

      </div>

      <div  className="bg-gray1 p-6 rounded-xl flex-grow h-[35rem] mr-28 overflow-auto"  >
        

      </div>
    </div>
  );
};

export default QuestionView;