import React from 'react';
import { Link } from 'react-router-dom';

const Question = (props) => {
    const {name, description, index} = props;
    return (
        <Link to={`/question/${index}`}>
            <div className="bg-white mb-4 rounded-xl px-5 pb-6 pt-2 hover:bg-gray-200">
                <h3>{name}</h3>
                <h3>Question:   ...</h3>
                <p className="font-light">{description}</p>
                <p>{index}</p>
            </div>
        </Link>
    );
}

export default Question;
