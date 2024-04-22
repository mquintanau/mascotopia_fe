import React from 'react'
import { useState } from 'react'


export default function Form() {
    
    const [showForm, setShowForm] = useState(false)
    return (
        <>
            <button 
            className='bg-white py-2 px-6 rounded-xl text-black font-normal'
            onClick={() => setShowForm(true)}
            >
            Ask a Question
            </button>

            {showForm && (
                <div 
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex justify-center items-center"
                onClick={() => setShowForm(false)}
                >
                    <div 
                    className='bg-white p-5 rounded-xl flex flex-col justify-center items-center gap-5'
                    onClick={(e) => e.stopPropagation()}
                    ></div>
                </div>
            )}

        </>
    )
}
