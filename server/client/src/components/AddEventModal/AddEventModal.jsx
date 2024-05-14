import { useState, useId } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const AddEventModal = ({ setAddEventShown, onEventAdded }) => {
  // Estado de formulario de evento nuevo
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const startDateId = useId();
  const endDateId = useId();

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onEventAdded({ title, startDate, endDate, description });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur hover:cursor-pointer"
      onClick={() => setAddEventShown(false)}
    >
      <div
        className="mx-5 flex w-96 flex-col gap-5 rounded-xl bg-navbar p-5 md:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
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
                selected={startDate}
                onChange={(date) => setStartDate(date)}
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
                selected={endDate}
                onChange={(date) => setEndDate(date)}
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
              onClick={() => setAddEventShown(false)}
            >
              Close
            </Button>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddEventModal.propTypes = {
  setAddEventShown: PropTypes.func.isRequired,
  onEventAdded: PropTypes.func.isRequired,
};
export default AddEventModal;
