import React from 'react';
import { Link } from 'react-router-dom';

const Question = (props) => {
    const {name, description, index , onSelect} = props;
    return (
        <Link to={`/questionView/${index}`}>
            <div className="bg-white mb-4 rounded-xl px-5 pb-6 pt-2 hover:bg-gray-200" onClick={() => onSelect({name,description,index})}>
                <h3>{name}</h3>
                <h3>Question:   ...</h3>
                <p className="font-light">{description}</p>
            </div>
        </Link>
    );
}

export default Question;
