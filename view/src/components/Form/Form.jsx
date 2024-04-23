import React from 'react'
import { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'


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
                    className='bg-navbar p-5 rounded-xl flex flex-col gap-5 w-96'
                    onClick={(e) => e.stopPropagation()}
                    >
                        <form>
                            <div className= "w-full">
                                <Input 
                                    type="text"
                                    label="Publication title"
                                    id="title"
                                    inputClassName='rounded-xl'
                                    maxLength={30}
                                />
                                <p className='mt-5'>Add a Description: </p>
                                <textarea type="text" className='mt-3  h-32 rounded-xl w-full py-2 px-4 bg-main' placeholder='Write Here' maxLength={200}/>
                            </div>
                            <Button type="button" className='mr-3' onClick={()=> setShowForm(false)}>Close</Button>
                            <Button type="submit">
                                Send
                            </Button>
                        </form>
                    </div>
                </div>
            )}

        </>
    )
}
