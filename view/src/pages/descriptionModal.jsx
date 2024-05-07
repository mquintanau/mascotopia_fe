import React from "react";
import moment from "moment";

export default function DescriptionModal({ isOpen, onClose, event, onDelete }) {
    if (!isOpen || !event) {
        return null;
    }

    const handleDelete = () => {
        console.log("Evento a eliminar:", event);
        // Confirmar antes de eliminar
        const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este evento?");
        if (confirmDelete) {
            console.log("Eliminando evento...");
            // Llamar a onDelete con el evento a eliminar
            onDelete(event);
        }
    };
    

    // Formatear la fecha y la hora en el formato deseado
    const formattedStartDate = moment(event.start).format("YYYY-MM-DD HH:mm");
    const formattedEndDate = moment(event.end).format("YYYY-MM-DD HH:mm");

    return (
        <div style={styles.modalBackground}>
            <div style={styles.modalContainer}>
                <h2><strong>Titulo:</strong> {event.title}</h2>
                <p><strong>Descripción:</strong> {event.extendedProps.description}</p>
                <p><strong>Start:</strong> {formattedStartDate}</p>
                <p><strong>End:</strong> {formattedEndDate}</p>
                <button onClick={handleDelete} style={styles.deleteButton}>Borrar evento</button>
                <button onClick={onClose} style={styles.closeButton}>Cerrar</button>
            </div>
        </div>
    );
}

const styles = {
    modalBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#d0f0c0',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    closeButton: {
        backgroundColor: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    deleteButton: {
        backgroundColor: '#ff9999',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
};
