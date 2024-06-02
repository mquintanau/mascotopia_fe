import LostPetCard from "../components/LostPetCard/LostPetCard";

const lostPetsData = [
  {
    _id: "1",
    nombre: "Buddy",
    vistoPorUltimaVez: "Central Park, New York",
    respondeA: "Bud",
    accesorios: "Red collar",
    infoContacto: "555-1234",
    imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
    comentarios: [
      {
        author: "John Doe",
        text: "I saw a dog like Buddy near the playground.",
      },
      {
        author: "Jane Smith",
        text: "Hope you find him soon!",
      },
    ],
    numComentarios: 2,
  },
  {
    _id: "2",
    nombre: "Whiskers",
    vistoPorUltimaVez: "5th Avenue, New York",
    respondeA: "Whisk",
    accesorios: "Blue bell",
    infoContacto: "555-5678",
    imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
    comentarios: [],
    numComentarios: 0,
  },
  {
    _id: "3",
    nombre: "Max",
    vistoPorUltimaVez: "Brooklyn Bridge, New York",
    respondeA: "Maxie",
    accesorios: "Green harness",
    infoContacto: "555-8765",
    imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
    comentarios: [
      {
        author: "Alice Johnson",
        text: "Max is so cute! I hope he comes home soon.",
      },
    ],
    numComentarios: 1,
  },
  {
    _id: "4",
    nombre: "Luna",
    vistoPorUltimaVez: "Times Square, New York",
    respondeA: "Lulu",
    accesorios: "Purple scarf",
    infoContacto: "555-4321",
    imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
    comentarios: [],
    numComentarios: 0,
  },
  {
    _id: "5",
    nombre: "Charlie",
    vistoPorUltimaVez: "Empire State Building, New York",
    respondeA: "Chaz",
    accesorios: "Yellow bandana",
    infoContacto: "555-1122",
    imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
    comentarios: [
      {
        author: "Michael Brown",
        text: "Charlie was spotted near the subway entrance.",
      },
      {
        author: "Sarah White",
        text: "Praying for Charlie's safe return.",
      },
    ],
    numComentarios: 2,
  },
  {
    _id: "6",
    nombre: "Bella",
    vistoPorUltimaVez: "Liberty Island, New York",
    respondeA: "Bell",
    accesorios: "Pink leash",
    infoContacto: "555-3344",
    imageURL: "https://i.ibb.co/jVqSrKt/Rectangle-34.png",
    comentarios: [],
    numComentarios: 0,
  },
];

const LostsPets = () => {
  return (
    <section className="min-h-screen w-screen justify-center">
      <h2 className="m-10 mr-0 w-full pt-10 text-2xl font-semibold">
        Losts Pets
      </h2>
      <div className="flex flex-row">
        <div className="flex w-[65%] flex-row flex-wrap items-center justify-center">
          {/* Seccion ver mascotas perdidas */}
          <h3 className="w-full text-center">Have you seen these pets?</h3>
          {lostPetsData.map((pet) => (
            <LostPetCard key={pet._id} pet={pet} />
          ))}
        </div>
        <div className="w-[35%] rounded-md bg-primary">
          {/* Formulario mascota perdida */}
        </div>
      </div>
    </section>
  );
};

export default LostsPets;
