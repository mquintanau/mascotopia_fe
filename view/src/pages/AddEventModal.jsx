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
      description,
    });

    onClose();
  };

  const styles = `
        .event-form {
            display: flex;
            flex-direction: column;
        }
        
        .event-input {
            border: 2px solid #98FB98; /* Borde verde pastel */
            border-radius: 10px; /* Bordes redondos */
            padding: 8px;
            margin-bottom: 10px;
            background-color: white; /* Fondo blanco */
            color: black; /* Texto negro */
        }

        .event-textarea {
            border: 2px solid #98FB98; /* Borde verde pastel */
            border-radius: 10px; /* Bordes redondos */
            padding: 8px;
            margin-bottom: 20px; /* Aumenta el espacio hacia abajo */
            background-color: white; /* Fondo blanco */
            resize: vertical; /* Permite redimensionar verticalmente */
            min-height: 100px; /* Altura mínima */
            color: black; /* Texto negro */
        }
        
        .event-button {
            background-color: #98FB98; /* Verde pastel */
            color: white;
            border: none;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            margin-top: 10px;
        }
        
        .event-button:hover {
            background-color: #7FFF00; /* Verde más oscuro al pasar el ratón */
        }

        .event-datepicker-container {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        .event-datepicker-label {
            margin-right: 10px;
            color: #98FB98; /* Texto verde pastel */
        }

        .event-datepicker {
            border: 2px solid #98FB98; /* Borde verde pastel */
            border-radius: 10px; /* Bordes redondos */
            background-color: white; /* Fondo blanco */
            padding: 8px;
            color: black; /* Texto negro */
        }

        .event-title {
            font-weight: bold; /* Letra en negrita */
            font-size: 36px; /* Tamaño de fuente */
            text-align: center; /* Centrar el texto */
            margin-bottom: 20px; /* Espaciado inferior */
            color: #98FB98; /* Color de texto verde pastel */
            font-family: "Arial Black", sans-serif; /* Cambia la fuente */
        }
    `;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <style>{styles}</style>

      <form className="event-form" onSubmit={onSubmit}>
        <h2 className="event-title">Añade tu evento</h2> {/* Título */}
        <input
          className="event-input"
          placeholder="Ingrese el titulo del evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="event-textarea"
          placeholder="Ingrese la descripcion del evento"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="event-datepicker-container">
          <label className="event-datepicker-label">Fecha de inicio:</label>
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="event-datepicker" // Aplicar la clase al DatePicker
          />
        </div>
        <div className="event-datepicker-container">
          <label className="event-datepicker-label">Fecha de fin:</label>
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="event-datepicker" // Aplicar la clase al DatePicker
          />
        </div>
        <button className="event-button">Add event</button>
      </form>
    </Modal>
  );
}
