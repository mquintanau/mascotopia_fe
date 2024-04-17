import  Input  from '../components/Input/Input';
import React, { useState } from 'react';
import Topic from '../components/Topic/Topic';
import QuestionList from '../components/QuestionList/QuestionList';

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



function Forum() {
    const [activeWindow, setActiveWindow] = useState(null);
    

    const handleButtonClick = (topicName) => {
        setActiveWindow(topicName);
    }

    return (
        <div className="h-screen flex flex-row items-start p-5" >
            <div className="bg-secondary p-6 rounded-xl h-[35rem] ml-28 w-96 overflow-auto">
                <h1 className="text-4xl mt-2 mb-3">Last Topics {'>'} </h1>
                <hr className="border-black mr-[-1.5rem]"></hr>
                <Input
                    id="search"
                    label="Search Forum"
                    className= "rounded-sm"
                />
                
                <ol className="mt-2">
                    <li><Topic name="Topic 1 >" onClick={() => handleButtonClick('Topic 1')}/></li>
                    <li><Topic name="Topic 2 >" onClick={() => handleButtonClick('Topic 2')}/></li>
                    <li><Topic name="Topic 3 >" onClick={() => handleButtonClick('Topic 3')}/></li>
                    <li><Topic name="Topic 4 >" onClick={() => handleButtonClick('Topic 4')}/></li>
                    <li><Topic name="Topic 5 >" onClick={() => handleButtonClick('Topic 5')}/></li>
                    <li><Topic name="Topic 6 >" onClick={() => handleButtonClick('Topic 6')}/></li>
                    <li><Topic name="Topic 7 >" onClick={() => handleButtonClick('Topic 7')}/></li>
                </ol>
            </div>

            <div className=" bg-green3 p-6 rounded-xl flex-grow h-[35rem] mr-28 overflow-auto">
                <h1 className="text-4xl mt-2 mb-12">{activeWindow}</h1>
                <QuestionList questions={questionTest}/>
                <div className="flex justify-center items-center">
                    <button className="w-60 text-center bg-white rounded-xl py-2">
                        Ask a question
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Forum;