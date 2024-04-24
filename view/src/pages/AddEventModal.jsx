import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddEventModal({ isOpen, onClose, onEventAdded }) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [description, setDescription] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            start,
            end,
            title,
            description
        });

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Ingrese el titulo del evento"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                    <input
                        placeholder="Ingrese la descripcion del evento"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Start Date</label>
                    <DatePicker
                        selected={start}
                        onChange={(date) => setStart(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <DatePicker
                        selected={end}
                        onChange={(date) => setEnd(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <button>Add event</button>
            </form>
        </Modal>
    );
}