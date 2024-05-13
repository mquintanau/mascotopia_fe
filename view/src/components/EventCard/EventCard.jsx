import PropTypes from "prop-types";

const EventCard = ({ event, time, handleEventClick }) => {
  const eventToSend = {
    ...event,
    extendedProps: {
      description: event.description,
      _id: event._id,
    },
  };

  return (
    <div
      className="my-4 flex flex-row justify-between overflow-hidden rounded-md bg-white hover:cursor-pointer"
      onClick={() =>
        handleEventClick({
          event: eventToSend,
        })
      }
    >
      <div className="p-4">
        <p>
          <span className="font-bold">Event: </span>
          {event.title}
        </p>
        <p>
          <span className="font-bold">Time: </span>
          {time}
        </p>
        <p>
          <span className="font-bold">Description: </span>
          {event.description}
        </p>
      </div>
      <div className="w-[50px] bg-primary"></div>
    </div>
  );
};

EventCard.propTypes = {
  time: PropTypes.string.isRequired,
};

export default EventCard;
