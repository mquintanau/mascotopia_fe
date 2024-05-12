import { useRef, useState } from "react";
import DescriptionModal from "./descriptionModal";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button/Button";

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  // Carga los eventos del API
  async function loadEvents(data) {
    const response = await axios.get(
      "http://localhost:4000/api/calendar/get-events?start=" +
        moment(data.start).toISOString() +
        "&end=" +
        moment(data.end).toISOString(),
    );
    setEvents(response.data);
  }

  async function handleEventDelete(eventToDelete) {
    try {
      await axios.delete(
        `http://localhost:4000/api/calendar/delete-event/${eventToDelete.title}`,
      );
      setEvents(events.filter((event) => event !== eventToDelete)); // Eliminar el evento de la lista local
      setSelectedEvent(null); // Cerrar el modal después de eliminar el evento
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  }

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();

    // Agregar evento
    calendarApi.addEvent({
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      description: event.description,
    });
  };

  async function handleEventAdd(info) {
    const { event } = info;

    const eventData = {
      start: moment(event.start).toISOString(),
      end: moment(event.end).toISOString(),
      title: event.title,
      description: event.extendedProps.description,
    };
    // await axios.post(
    //   "http://localhost:4000/api/calendar/create-event",
    //   eventData,
    // );
    console.log({ event });
  }

  function handleEventClick(info) {
    setSelectedEvent(info.event);
    setModalOpen(false); // Cerrar modal de agregar evento si está abierto
  }

  return (
    <>
      <h1 className="text-4xl">Calendar</h1>
      <Button
        onClick={() => setModalOpen(true)}
        className="mb-4 rounded border-none bg-green-200 px-4 py-2 text-black"
      >
        Add event
      </Button>
      <div className="relative z-0">
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          // eventAdd={(event) => handleEventAdd(event)}
          eventContent={(eventInfo) => (
            <>
              <div className="relative rounded bg-green-200 px-2 py-1 text-black shadow-md">
                {eventInfo.event.title}
              </div>
            </>
          )}
          eventClassNames="custom-event"
          datesSet={(date) => loadEvents(date)}
          eventClick={handleEventClick}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
      {selectedEvent && (
        <DescriptionModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={selectedEvent}
        />
      )}
      {selectedEvent && (
        <DescriptionModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={selectedEvent}
          onDelete={handleEventDelete} // Pasar la función onDelete al componente hijo
        />
      )}
    </>
  );
}

export default Calendar;
