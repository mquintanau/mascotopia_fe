import { useRef, useState } from "react";
import DescriptionModal from "./descriptionModal";
import AddEventModal from "./AddEventModal";

// Librerías externas
import axios from "axios";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Estilos sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const ReactSwal = withReactContent(Swal);

import Button from "../components/Button/Button";

function Calendar() {
  // Estados de modal y calendario
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  // Estado de formulario de evento nuevo
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");

  // Funciones visuales del calendario
  function showEventModal() {
    ReactSwal.fire({
      title: "New Event",
      html: (
        <div>
          <input id="title" className="swal2-input" placeholder="Event Title" />
          <input
            id="start"
            className="swal2-input"
            placeholder="Start Date"
            type="date"
          />
          <input
            id="end"
            className="swal2-input"
            placeholder="End Date"
            type="date"
          />
          <input
            id="description"
            className="swal2-input"
            placeholder="Description"
          />
        </div>
      ),
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById("title").value,
          start: document.getElementById("start").value,
          end: document.getElementById("end").value,
          description: document.getElementById("description").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes manejar los datos del formulario
        console.log(result.value);
      }
    });
  }

  // Muestra el modal del evento
  function handleEventClick(info) {
    setSelectedEvent(info.event);
    setModalOpen(false); // Cerrar modal de agregar evento si está abierto
  }

  // Funciones de lógica del calendario

  // Agrega un evento de forma local
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

  // Agrega un evento al API
  async function handleEventAdd(info) {
    const { event } = info;

    const eventData = {
      start: moment(event.start).toISOString(),
      end: moment(event.end).toISOString(),
      title: event.title,
      description: event.extendedProps.description,
    };
    try {
      await axios.post(
        "http://localhost:4000/api/calendar/create-event",
        eventData,
      );
      // Muestra una notificacion toast de confirmacion
      Swal.fire({
        icon: "success",
        title: "Event added successfully!",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "There was an error! Please try again or contact support.",
        text: { error },
      });
    }
    console.log({ event });
  }

  // Elimina un evento del API
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

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1000px] flex-row flex-wrap justify-center p-4">
        <h1 className="mb-4 w-full text-4xl">Calendar</h1>
        <section className="w-[60%] max-w-[600px] rounded-xl rounded-r-none bg-[#80ed99]">
          <div className="z-0 m-12 rounded-xl bg-white p-4">
            <FullCalendar
              ref={calendarRef}
              events={events}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              eventClick={handleEventClick}
              eventContent={(eventInfo) => (
                <div className="rounded bg-primary px-2 py-1 text-black shadow-md outline-none">
                  {eventInfo.event.title}
                </div>
              )}
              eventAdd={(event) => handleEventAdd(event)}
              datesSet={(date) => loadEvents(date)}
              eventBorderColor="#bbf7d0"
              eventBackgroundColor="#bbf7d0"
              aspectRatio={1}
            />
          </div>
        </section>
        <section className="w-[40%] rounded-lg bg-[#6fc2bd] p-4">
          {/* Muestra titulo de la fecha actual */}
          <h2 className="mb-4 text-2xl">
            {moment().format("dddd, MMMM Do YYYY")}
          </h2>
          <Button
            onClick={() => showEventModal(true)}
            className="mb-4 rounded border-none bg-green-200 px-4 py-2 text-black"
          >
            Add event
          </Button>
        </section>
      </div>
      {/* <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      /> */}
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
