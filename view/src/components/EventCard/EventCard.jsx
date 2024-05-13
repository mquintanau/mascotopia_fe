import PropTypes from "prop-types";

const EventCard = ({ title, time, description }) => {
  return (
    <div className="my-4 flex flex-row justify-between overflow-hidden rounded-md bg-white">
      <div className="p-4">
        <p>
          <span className="font-bold">Event: </span>
          {title}
        </p>
        <p>
          <span className="font-bold">Time: </span>
          {time}
        </p>
        <p>
          <span className="font-bold">Description: </span>
          {description}
        </p>
      </div>
      <div className="w-[50px] bg-primary"></div>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default EventCard;
