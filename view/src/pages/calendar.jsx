import React, { useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DescriptionModal from "./descriptionModal";

export default function () {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    async function handleDatesSet(data) {
        const response = await axios.get("http://localhost:4000/api/calendar/get-events?start=" + moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString())
        setEvents(response.data);
    }

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,
            description: event.description
        });
    };

    async function handleEventAdd(info) {
        const { event } = info;
        const eventData = {
            start: moment(event.start).toISOString(),
            end: moment(event.end).toISOString(),
            title: event.title,
            description: event.extendedProps.description
        };
        await axios.post("http://localhost:4000/api/calendar/create-event", eventData);
    }

    function handleEventClick(info) {
        setSelectedEvent(info.event);
        setAddModalOpen(false); // Cerrar modal de agregar evento si está abierto
    }

    return (
        <section>
            <button onClick={() => setModalOpen(true)} style={styles.addButton}>Add event</button>
            <div style={styles.calendarContainer}>
                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventAdd ={(event) => handleEventAdd(event)}
                    eventContent={(eventInfo) => (
                        <>
                            <div style={styles.eventContainer}>{eventInfo.event.title}</div>
                        </>
                    )}
                    eventClassNames="custom-event"
                    datesSet={(date) => handleDatesSet(date)}
                    eventClick={handleEventClick}
                />
            </div>
            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
            {selectedEvent && <DescriptionModal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} event={selectedEvent} />}
        </section>
    )
}

const styles = {
    addButton: {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px'
    },
    calendarContainer: {
        position: 'relative',
        zIndex: 0
    },
    eventContainer: {
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#98FB98',
        padding: '2px 5px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }
};