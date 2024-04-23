import  Input  from '../components/Input/Input';
import React, { useState } from 'react';
import Topic from '../components/Topic/Topic';
import QuestionList from '../components/QuestionList/QuestionList';
import Search from "../assets/Search.png";
import Form from '../components/Form/Form';
import Blob from "../assets/Blob.png";

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
        <div className="h-screen flex flex-row items-start p-5"
        style={{
            backgroundImage: `url(${Blob})`,
            backgroundPosition: '50%', 
            backgroundRepeat: 'no-repeat', 
          }}>
            <div className="bg-secondary p-6 rounded-xl h-[35rem] ml-28 w-96 overflow-auto">
                <h1 className="text-4xl mt-2 mb-3">Last Topics {'>'} </h1>
                <hr className="border-black mr-[-1.5rem]"></hr>
                <div className='flex flex-row items-start w-full mt-3'>
                    <button className="w-5 h-5 mx-2 translate-y-3.5">
                        <img src={Search}/>
                    </button>
                    <Input
                        type="text"
                        id="search"
                        label= "Search Forum"
                        inputClassName= "py-0 rounded-md"
                        labelClassName= "translate-y-[-35%]"
                    />
                </div>

                <ol className="mt-0">
                    <li>
                        <Topic
                            name="Topic 1 >"
                            onClick={() => handleButtonClick('Topic 1')}
                            className={activeWindow === 'Topic 1' ? "bg-teal text-white " : ""}
                        />
                    </li>
                    <li>
                        <Topic
                            name="Topic 2 >"
                            onClick={() => handleButtonClick('Topic 2')}
                            className={activeWindow === 'Topic 2' ? "bg-teal text-white " : ""}
                        />
                    </li>
                    <li>
                        <Topic
                            name="Topic 3 >"
                            onClick={() => handleButtonClick('Topic 3')}
                            className={activeWindow === 'Topic 3' ? "bg-teal text-white " : ""}
                        />
                    </li>
                    <li>
                        <Topic
                            name="Topic 4 >"
                            onClick={() => handleButtonClick('Topic 4')}
                            className={activeWindow === 'Topic 4' ? "bg-teal text-white " : ""}
                        />
                    </li>
                    <li>
                        <Topic
                            name="Topic 5 >"
                            onClick={() => handleButtonClick('Topic 5')}
                            className={activeWindow === 'Topic 5' ? "bg-teal text-white " : ""}
                        />
                    </li>
                    <li>
                        <Topic
                            name="Topic 6 >"
                            onClick={() => handleButtonClick('Topic 6')}
                            className={activeWindow === 'Topic 6' ? "bg-teal text-white " : ""}
                        />
                    </li>
                    <li>
                        <Topic
                            name="Topic 7 >"
                            onClick={() => handleButtonClick('Topic 7')}
                            className={activeWindow === 'Topic 7' ? "bg-teal text-white " : ""}
                        />
                    </li>
                </ol>
            </div>

            <div className="bg-green3 p-6 rounded-xl flex-grow h-[35rem] mr-28 overflow-auto">
                <h1 className="text-4xl mt-2 mb-12">{activeWindow}</h1>
                <QuestionList questions={questionTest} />
                <div className="flex justify-center items-center">
                    <Form />
                </div>
            </div>
        </div>
    );
}

export default Forum;
