import moment from "moment";
import Button from "../components/Button/Button";
import Swal from "sweetalert2";

export default function DescriptionModal({ isOpen, onClose, event, onDelete }) {
  if (!isOpen || !event) {
    return null;
  }

  const handleDelete = () => {
    // Confirm before deleting
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Deleting event...");
        // Call onDelete with the event to delete
        onDelete(event);
      }
    });
  };

  // Format the date and time in the desired format
  const formattedStartDate = moment(event.start).format("YYYY-MM-DD HH:mm");
  const formattedEndDate = moment(event.end).format("YYYY-MM-DD HH:mm");

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur hover:cursor-pointer">
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
        <p className="mb-5">
          <strong>End:</strong> {formattedEndDate}
        </p>
        <Button
          onClick={handleDelete}
          className="mr-2 cursor-pointer rounded border-none bg-red-400 px-4 py-2 text-white hover:bg-red-500 hover:text-white active:bg-red-600"
        >
          Delete event
        </Button>
        <Button
          onClick={onClose}
          className="cursor-pointer rounded border-none bg-white px-4 py-2 !text-black hover:bg-neutral-100 hover:text-black active:outline"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
