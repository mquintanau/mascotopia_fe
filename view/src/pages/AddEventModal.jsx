import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';

export default function ({ isOpen, onClose, onEventAdded }) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [description, setDescription] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            title,
            start,
            end,
            description
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <form onSubmit={onSubmit}>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Title</label>
                    <input style={inputStyle} placeholder="Enter event title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Description</label>
                    <input style={inputStyle} placeholder="Enter event description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Start Date</label>
                    <Datetime className="form-control" value={start} onChange={date => setStart(date)} />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>End Date</label>
                    <Datetime className="form-control" value={end} onChange={date => setEnd(date)} />
                </div>
                <button style={buttonStyle}>Add event</button>
            </form>
        </Modal>
    );
}

const customStyles = {
    content: {
        width: '400px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '5px'
    }
};

const formGroupStyle = {
    marginBottom: '20px'
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
    lineHeight: '1.5'
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff'
};