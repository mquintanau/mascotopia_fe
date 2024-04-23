import React, { useState} from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime'
export default function ({isOpen, onClose,onEventAdded}){
    const [title,setTitle] = useState("");
    const [start,setStart] = useState(new Date());
    const [end,setEnd] = useState(new Date());
    const [description,setDescription] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            title,
            start,
            end,
            description
        })
        onClose();
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input placeholder="Ingrese el titulo del evento" value={title} onChange={e => setTitle(e.target.value)}/>
                <div>
                    <input placeholder="Ingrese la descripcion del evento" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Start Date</label>
                    <Datetime value={start} onChange={date=> setStart(date)} />
                </div>
                <div>
                    <label>End Date</label>
                    <Datetime value={end} onChange={date=> setEnd(date)} />
                </div>
                <button>Add event</button>
                
            </form>

        </Modal>
    )
}