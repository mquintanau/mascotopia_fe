import { useRef, useState } from "react";
import DescriptionModal from "./descriptionModal";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  async function handleDatesSet(data) {
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
    let currentDate = moment(event.start);
    const endDate = moment(event.end);

    // Agregar eventos para cada día del evento
    while (currentDate <= endDate) {
      calendarApi.addEvent({
        start: currentDate.toDate(),
        end: currentDate.clone().endOf("day").toDate(),
        title: event.title,
        description: event.description,
        color: "#98FB98", // Color verde pastel
        rendering: "background", // Renderizar como fondo
      });
      currentDate.add(1, "days");
    }

    // Agregar evento para el último día (end)
    calendarApi.addEvent({
      start: endDate.toDate(),
      end: endDate.clone().endOf("day").toDate(),
      title: event.title,
      description: event.description,
      color: "#98FB98", // Color verde pastel
      rendering: "background", // Renderizar como fondo
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
    await axios.post(
      "http://localhost:4000/api/calendar/create-event",
      eventData,
    );
  }

  function handleEventClick(info) {
    setSelectedEvent(info.event);
    setModalOpen(false); // Cerrar modal de agregar evento si está abierto
  }

  return (
    <section>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 rounded border-none bg-green-200 px-4 py-2 text-black"
      >
        Add event
      </button>
      <div className="relative z-0">
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventAdd={(event) => handleEventAdd(event)}
          eventContent={(eventInfo) => (
            <>
              <div className="z-1 relative rounded bg-green-200 px-2 py-1 shadow-md">
                {eventInfo.event.title}
              </div>
            </>
          )}
          eventClassNames="custom-event"
          datesSet={(date) => handleDatesSet(date)}
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
    </section>
  );
}

export default Calendar;
