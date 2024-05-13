import { useRef, useState, useId } from "react";
import DescriptionModal from "./descriptionModal";
import AddEventModal from "./AddEventModal";
import DatePicker from "react-datepicker";

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
import Input from "../components/Input/Input";

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
  const [modalOpen, setModalOpen] = useState(false);

  const startDateId = useId();
  const endDateId = useId();

  // Muestra el modal del evento
  function handleEventClick(info) {
    setSelectedEvent(info.event);
    // setModalOpen(false); // Cerrar modal de agregar evento si está abierto
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
            onClick={() => setModalOpen(true)}
            className="mb-4 rounded border-none bg-green-200 px-4 py-2 text-black"
          >
            Add event
          </Button>
        </section>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur hover:cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="mx-5 flex w-96 flex-col gap-5 rounded-xl bg-navbar p-5 md:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={onEventAdded}>
              <div className="flex w-full flex-col items-center justify-center">
                <h1 className="mb-5 text-center text-3xl font-semibold">
                  Add an Event 📅
                </h1>
                <Input
                  type="text"
                  label="Event title"
                  inputClassName="rounded-xl"
                  maxLength={30}
                  onChange={(e) => setTitle(e.target.value)}
                  required={true}
                  className="mb-6"
                />
                <div className="flex w-full flex-row flex-wrap items-center justify-center">
                  <label htmlFor={startDateId} className="mr-3 text-center">
                    Start Date:
                  </label>
                  <DatePicker
                    selected={start}
                    onChange={(date) => setStart(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="bg-main px-4 py-2"
                    id={startDateId}
                  />
                </div>
                <div className="mt-4 flex w-full flex-row flex-wrap items-center justify-center">
                  <label htmlFor={endDateId} className="mr-5 text-center">
                    End Date:
                  </label>
                  <DatePicker
                    selected={end}
                    onChange={(date) => setEnd(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="bg-main px-4 py-2"
                    id={endDateId}
                  />
                </div>
                <Input
                  type="text"
                  label="Event description"
                  maxLength={100}
                  onChange={(e) => setDescription(e.target.value)}
                  required={true}
                  className="mt-7"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  type="button"
                  className="mr-3 bg-red-400 hover:bg-black hover:text-red-400"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </Button>
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        </div>
      )}
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
