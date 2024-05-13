import { useRef, useState, useId, useEffect, useCallback } from "react";
import DescriptionModal from "./DescriptionModal";
import DatePicker from "react-datepicker";

// Librerías externas
import axios from "axios";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Estilos sweetalert
import Swal from "sweetalert2";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import EventCard from "../components/EventCard/EventCard";

function Calendar() {
  // Estados de modal y calendario
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [todayEvents, setTodayEvents] = useState([]);
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
    console.log(info.event);
    // setModalOpen(false); // Cerrar modal de agregar evento si está abierto
  }

  // Funciones de lógica del calendario

  // Agrega un evento de forma local
  const onEventAdded = (event) => {
    event.preventDefault();
    let calendarApi = calendarRef.current.getApi();

    // Agregar evento
    calendarApi.addEvent({
      title: title,
      start: start.toISOString(),
      end: end.toISOString(),
      description: description,
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

  // Carga los eventos de hoy
  const loadEventsToday = useCallback(async () => {
    try {
      // Obtener eventos de hoy
      const response = await axios.get(
        "http://localhost:4000/api/calendar/get-events-today",
      );
      setTodayEvents(response.data);
      console.log("Eventos de hoy:", response.data);
    } catch (error) {
      console.error("Error al cargar los eventos de hoy:", error);
    }
  }, []);

  useEffect(() => {
    loadEventsToday();
  }, [loadEventsToday]);

  // Agrega un evento al API
  async function handleEventAdd() {
    const eventData = {
      start: moment(start).toISOString(),
      end: moment(end).toISOString(),
      title: title,
      description: description,
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

      loadEventsToday();
      setModalOpen(false); // Cerrar el modal después de agregar el evento
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "There was an error! Please try again or contact support.",
        text: { error },
      });
      console.log("Error al agregar el evento:", error);
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

  useEffect(() => {
    loadEventsToday();
  }, [loadEventsToday]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1000px] flex-row flex-wrap justify-center p-4">
        <h1 className="mb-4 w-full text-center text-4xl lg:text-left">
          Calendar 📅
        </h1>
        <section className="w-[100%] max-w-[600px] rounded-xl md:bg-primary lg:w-[60%] lg:rounded-r-none">
          <div className="z-0 rounded-xl bg-white p-4 md:m-12">
            <FullCalendar
              ref={calendarRef}
              events={events}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              eventClick={handleEventClick}
              eventContent={(eventInfo) => (
                <div className="w-full overflow-x-scroll rounded bg-primary px-2 py-1 text-black shadow-md outline-none hover:cursor-pointer">
                  <p className="w-[30px] break-words">
                    {eventInfo.event.title}
                  </p>
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
        <section className="mt-6 flex w-[100%] max-w-[600px] flex-col justify-center rounded-lg bg-[#6fc2bd] p-4 lg:mt-0 lg:w-[40%]">
          {/* Muestra titulo de la fecha actual */}
          <h2 className="mb-4 text-2xl">
            {moment().format("dddd, MMMM Do YYYY")}
          </h2>
          <div>
            {todayEvents.map((event, index) => {
              let date = new Date(event.start);
              let time = `${date.getHours() == 0 ? "00" : date.getHours()}:${date.getMinutes() == "0" ? "00" : date.getMinutes()}`;

              return (
                <EventCard
                  key={index}
                  title={event.title}
                  time={time}
                  start={event.start}
                  end={event.end}
                  description={event.description}
                  handleEventClick={handleEventClick}
                />
              );
            })}
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="mx-auto mb-4 w-[200px] rounded border-none bg-green-200 px-4 py-2 text-black"
          >
            Add Event
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
                  value={title}
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
                  value={description}
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
          onDelete={handleEventDelete} // Pasar la función onDelete al componente hijo
        />
      )}
    </>
  );
}

export default Calendar;
