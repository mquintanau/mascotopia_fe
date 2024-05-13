import moment from "moment";

export default function DescriptionModal({ isOpen, onClose, event, onDelete }) {
  if (!isOpen || !event) {
    return null;
  }

  const handleDelete = () => {
    console.log("Event to delete:", event);
    // Confirm before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );
    if (confirmDelete) {
      console.log("Deleting event...");
      // Call onDelete with the event to delete
      onDelete(event);
    }
  };

  // Format the date and time in the desired format
  const formattedStartDate = moment(event.start).format("YYYY-MM-DD HH:mm");
  const formattedEndDate = moment(event.end).format("YYYY-MM-DD HH:mm");

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-green-200 p-4 shadow">
        <h2>
          <strong>Title:</strong> {event.title}
        </h2>
        <p>
          <strong>Description:</strong> {event.extendedProps.description}
        </p>
        <p>
          <strong>Start:</strong> {formattedStartDate}
        </p>
        <p>
          <strong>End:</strong> {formattedEndDate}
        </p>
        <button
          onClick={handleDelete}
          className="mr-2 cursor-pointer rounded border-none bg-red-400 px-4 py-2"
        >
          Delete event
        </button>
        <button
          onClick={onClose}
          className="cursor-pointer rounded border-none bg-white px-4 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
