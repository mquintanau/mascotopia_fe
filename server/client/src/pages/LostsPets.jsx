import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import LostPetCard from "../components/LostPetCard/LostPetCard";
import { Plus } from "iconoir-react";
import Swal from "sweetalert2";
import { API_URL } from "../auth/constants";

// const lostPetsData = [
//   {
//     _id: "1",
//     nombre: "Buddy",
//     vistoPorUltimaVez: "Central Park, New York",
//     respondeA: "Bud",
//     accesorios: "Red collar",
//     infoContacto: "555-1234",
//     imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
//     comentarios: [
//       {
//         author: "John Doe",
//         text: "I saw a dog like Buddy near the playground.",
//       },
//       {
//         author: "Jane Smith",
//         text: "Hope you find him soon!",
//       },
//     ],
//     numComentarios: 2,
//   },
//   {
//     _id: "2",
//     nombre: "Whiskers",
//     vistoPorUltimaVez: "5th Avenue, New York",
//     respondeA: "Whisk",
//     accesorios: "Blue bell",
//     infoContacto: "555-5678",
//     imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
//     comentarios: [],
//     numComentarios: 0,
//   },
//   {
//     _id: "3",
//     nombre: "Max",
//     vistoPorUltimaVez: "Brooklyn Bridge, New York",
//     respondeA: "Maxie",
//     accesorios: "Green harness",
//     infoContacto: "555-8765",
//     imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
//     comentarios: [
//       {
//         author: "Alice Johnson",
//         text: "Max is so cute! I hope he comes home soon.",
//       },
//     ],
//     numComentarios: 1,
//   },
//   {
//     _id: "4",
//     nombre: "Luna",
//     vistoPorUltimaVez: "Times Square, New York",
//     respondeA: "Lulu",
//     accesorios: "Purple scarf",
//     infoContacto: "555-4321",
//     imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
//     comentarios: [],
//     numComentarios: 0,
//   },
//   {
//     _id: "5",
//     nombre: "Charlie",
//     vistoPorUltimaVez: "Empire State Building, New York",
//     respondeA: "Chaz",
//     accesorios: "Yellow bandana",
//     infoContacto: "555-1122",
//     imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
//     comentarios: [
//       {
//         author: "Michael Brown",
//         text: "Charlie was spotted near the subway entrance.",
//       },
//       {
//         author: "Sarah White",
//         text: "Praying for Charlie's safe return.",
//       },
//     ],
//     numComentarios: 2,
//   },
//   {
//     _id: "6",
//     nombre: "Bella",
//     vistoPorUltimaVez: "Liberty Island, New York",
//     respondeA: "Bell",
//     accesorios: "Pink leash",
//     infoContacto: "555-3344",
//     imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
//     comentarios: [],
//     numComentarios: 0,
//   },
// ];

const LostsPets = () => {
  const [lostPetsData, setLostPetsData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/lostPets/getPets`)
      .then((response) => response.json())
      .then((data) => {
        setLostPetsData(data);
      })
      .catch((error) =>
        // Muestra un mensaje de error si no se pueden cargar los foros
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          description: error,
        }),
      );
  }, []);

  return (
    <section className="min-h-screen w-screen justify-center">
      <h2 className="m-10 mr-0 w-full pt-10 text-center text-4xl font-semibold">
        🐶 Losts Pets
      </h2>
      <div className="my-10 flex flex-row">
        <div className="flex w-[65%] flex-row flex-wrap items-center justify-center">
          {/* Seccion ver mascotas perdidas */}
          <h3 className="w-full text-center text-xl">
            Have you seen these pets?
          </h3>
          {lostPetsData === null ? (
            <h1 className="mt-[-400px]">Loading...</h1>
          ) : lostPetsData.length === 0 ? (
            <h1 className="mt-[-400px]">No lost pets found</h1>
          ) : (
            lostPetsData.map((pet) => <LostPetCard key={pet._id} pet={pet} />)
          )}
        </div>
        <div className="mr-10 w-[35%] rounded-md">
          {/* Formulario mascota perdida */}
          <h3 className="mb-10 w-full text-center text-xl">
            Have you lost your pet?
          </h3>
          <form
            action=""
            className="flex flex-col items-center rounded-lg bg-primary p-4 text-left"
          >
            <p>
              Don’t worry, we’re here to help. Fill with helpful information so
              others can find them:
            </p>
            <p className="mt-3 w-full text-left">Add a recent picture:</p>
            <div className="bg-background relative mt-5 h-[150px] w-[150px] rounded-lg">
              <div className="absolute right-0 flex h-[40px] w-[40px] -translate-y-3 translate-x-3 items-center justify-center rounded-full bg-secondary">
                <Plus fontSize={50} />
              </div>
            </div>
            <p className="my-4 w-full">Add your pet&#39;s information: </p>
            <Input label="Last Seen" className="my-4" />
            <Input label="Responds to" className="my-4" />
            <Input label="Accesories" className="my-4" />
            <Input label="Commentary" className="my-4" />
            <Input label="Contact Information" className="my-4" />
            <Button className="bg-secondary">Send</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LostsPets;
