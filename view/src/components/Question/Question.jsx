import React from 'react';

const Question = (props) => {
    const {name, description} = props;
    return (
        <div className="bg-white mb-4 rounded-xl px-5 pb-6 pt-2">
            <h3>{name}</h3>
            <h3>Question: ...</h3>
            <p className="font-light">{description}</p>
        </div>
    );


}

export default Question;