import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

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

    // Función para renderizar los días del calendario personalizado
    const renderDay = (props, currentDate, selectedDate) => {
        return (
            <td
                {...props}
                onClick={() => props.onClick(currentDate)}
                className={props.className}
                style={{ ...props.style, cursor: 'pointer', color: 'black' }} // Cambia el color de los números de los días a negro
            >
                {currentDate.date()}
            </td>
        );
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
                    <Datetime
                        value={start}
                        onChange={date => setStart(date)}
                        renderDay={renderDay} // Usa la función renderDay para personalizar la apariencia de los días del calendario
                        inputProps={{ placeholder: 'Select start date', style: { ...inputStyle, color: 'black' } }}
                        timeFormat={true}
                        // Estilos adicionales para el calendario
                        style={{ ...inputStyle, color: 'black', width: '100%' }} // Cambia el color del texto del calendario a negro
                        next2Label={<span style={{ color: 'black' }}>»</span>} // Cambia el color de la flecha de avanzar dos meses a negro
                        prev2Label={<span style={{ color: 'black' }}>«</span>} // Cambia el color de la flecha de retroceder dos meses a negro
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>End Date</label>
                    <Datetime
                        value={end}
                        onChange={date => setEnd(date)}
                        renderDay={renderDay} // Usa la función renderDay para personalizar la apariencia de los días del calendario
                        inputProps={{ placeholder: 'Select end date', style: { ...inputStyle, color: 'black' } }}
                        timeFormat={true}
                        // Estilos adicionales para el calendario
                        style={{ ...inputStyle, color: 'black', width: '100%' }} // Cambia el color del texto del calendario a negro
                        next2Label={<span style={{ color: 'black' }}>»</span>} // Cambia el color de la flecha de avanzar dos meses a negro
                        prev2Label={<span style={{ color: 'black' }}>«</span>} // Cambia el color de la flecha de retroceder dos meses a negro
                    />
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
    marginBottom: '5px',
    color: 'black' // Cambia el color del texto de la etiqueta a negro
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