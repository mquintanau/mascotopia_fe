import React, { useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment"

export default function () {
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start:moment(event.start).toDate(),
            end:moment(event.end).toDate(),
            title: event.title,
            description: event.description

        });
    };

    async function handleEventAdd(data){
        await axios.post("http://localhost:4000/api/calendar/create-event", data.event);
    }
    async function handleDatesSet(data){
        const response = await axios.get("http://localhost:4000/api/calendar/get-events?start="+moment(data.start).toISOString()+"&end="+moment(data.end).toISOString())
            setEvents(response.data);

    }

    return (
        <section>
            <button onClick={() => setModalOpen(true)} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '10px', borderRadius: '5px' }}>Add event</button>
            <div style={{ position: 'relative', zIndex: 0 }}>
                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventAdd ={(event) => handleEventAdd(event)}
                    datesSet={(date) => handleDatesSet(date)}
                />
            </div>
            <AddEventModal isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onEventAdded={event => onEventAdded(event)} />
        </section>
    )
}