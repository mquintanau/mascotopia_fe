import { useRef, useState, useEffect, useCallback, useContext } from "react";
import DescriptionModal from "./DescriptionModal";
import DataContext from "../auth/DataContext";
import useUserLoader from "../utils/useUserLoader";
import { API_URL } from "../auth/constants";

// Librerías externas
import axios from "axios";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Estilos sweetalert
import Swal from "sweetalert2";

import Button from "../components/Button/Button";
import EventCard from "../components/EventCard/EventCard";
import AddEventModal from "../components/AddEventModal/AddEventModal";
import DecorationLineRegister from "../assets/decorationLineRegister.svg";

function Calendar() {
  // Estados de modal y calendario
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [todayEvents, setTodayEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [key, setKey] = useState(0); // Key para forzar la actualización del componente del calendario
  const calendarRef = useRef(null);
  const [addEventShown, setAddEventShown] = useState(false);

  // Contexto de usuario
  const { data, setData } = useContext(DataContext);
  const id = localStorage.getItem("idUser");
  const loadUser = useUserLoader(API_URL, id, setData);
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Muestra el modal del evento
  function handleEventClick(info) {
    setSelectedEvent(info.event);
  }

  // Funciones de lógica del calendario

  // Agrega un evento de forma local
  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();

    // Agregar evento
    calendarApi.addEvent({
      title: event.title,
      start: event.startDate.toISOString(),
      end: event.endDate.toISOString(),
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

  // Carga los eventos de hoy
  const loadEventsToday = useCallback(async () => {
    try {
      // Obtener eventos de hoy
      const response = await axios.get(
        "http://localhost:4000/api/calendar/get-events-today",
      );
      setTodayEvents(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "There was an error! Please try again or contact support.",
        text: { error },
      });
      console.error("Error al cargar los eventos de hoy:", error);
    }
  }, []);

  useEffect(() => {
    loadEventsToday();
  }, [loadEventsToday]);

  // Agrega un evento al API
  async function handleEventAdd(info) {
    const { event } = info;
    const eventData = {
      start: moment(event.start).toISOString(),
      end: moment(event.end).toISOString(),
      title: event.title,
      description: event.extendedProps.description,
      idUsuario: id,
      nombreUsuario: data.nombre,
      shouldLogActivity: true,
    };

    // Verificar que la fecha de inicio sea menor a la fecha de fin
    if (event.start >= event.end) {
      Swal.fire({
        icon: "error",
        title: "The end date must be greater than the start date",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
      info.revert(); // Revertir el evento si la fecha de inicio es mayor a la fecha de fin
      return;
    } else {
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

        setKey((prevKey) => prevKey + 1); // Recargar los eventos del calendario
        loadEventsToday();
        setAddEventShown(false); // Cerrar el modal después de agregar el evento
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "There was an error! Please try again or contact support.",
          text: { error },
        });
        console.log("Error creating event:", error);
      }
    }
  }

  // Elimina un evento del API
  async function handleEventDelete(eventToDelete) {
    try {
      await axios.delete(
        `http://localhost:4000/api/calendar/delete-event/${eventToDelete.extendedProps._id}`,
        { data: { idUsuario: id, nombreUsuario: data.nombre } },
      );

      setEvents(events.filter((event) => event !== eventToDelete)); // Eliminar el evento de la lista local
      setSelectedEvent(null); // Cerrar el modal después de eliminar el evento
      loadEventsToday(); // Recarga los eventos de hoy
      setKey((prevKey) => prevKey + 1); // Recarga los eventos de fullcalendar

      Swal.fire({
        icon: "success",
        title: "Event deleted successfully!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "There was an error! Please try again or contact support.",
        text: { error },
      });
      console.error("Error deleting event", error);
    }
  }

  useEffect(() => {
    loadEventsToday();
  }, [loadEventsToday]);

  return (
    <div
      style={{ backgroundImage: `url(${DecorationLineRegister})` }}
      className="bg-cover bg-center bg-no-repeat"
    >
      <div className="min-w-screen mx-auto flex w-full max-w-[1000px] flex-row flex-wrap justify-center p-4">
        <h1 className="mb-4 w-full text-center text-4xl lg:text-left">
          Calendar 📅
        </h1>
        <section className="w-[100%] max-w-[600px] rounded-xl md:bg-primary lg:w-[60%] lg:rounded-r-none">
          <div className="z-0 rounded-xl bg-white p-4 md:m-12">
            <FullCalendar
              ref={calendarRef}
              key={key}
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
                  time={time}
                  event={event}
                  handleEventClick={handleEventClick}
                />
              );
            })}
          </div>
          <Button
            onClick={() => setAddEventShown(true)}
            className="mx-auto mb-4 w-[200px] rounded border-none bg-green-200 px-4 py-2 text-black"
          >
            Add Event
          </Button>
        </section>
      </div>
      {/* Seccion de alertas modal */}
      {addEventShown && (
        <AddEventModal
          setAddEventShown={setAddEventShown}
          onEventAdded={onEventAdded}
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
    </div>
  );
}

export default Calendar;
