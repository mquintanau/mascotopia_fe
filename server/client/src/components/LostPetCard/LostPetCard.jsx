import { twMerge } from "tailwind-merge";

const LostPetCard = ({ pet, className }) => {
  const divClass = twMerge(
    "flex flex-row rounded-lg max-w-full bg-[#90d8d4] p-3 shadow-lg lg:m-2 lg:w-[45%] flex-wrap md:justify-center lg:mt-0",
    className,
  );
  // Recibe objeto pet directamente y desestructura sus propiedades
  const { nombre, imageURL, infoContacto, accesorios, vistoPorUltimaVez } = pet;
  return (
    <div className={divClass}>
      <div className="flex w-full flex-col flex-wrap items-center justify-center md:h-[200px] md:w-[45%] md:flex-nowrap">
        <h3 className="w-full break-words text-xl font-bold">{nombre}</h3>
        <img
          className="rounded-lg"
          src={`https://mascotopia-fe.onrender.com${imageURL}`}
          alt="lost pet"
        />
      </div>
      <div className="mt-4 flex max-h-[100px] w-full flex-row flex-wrap overflow-y-scroll break-words text-sm md:ml-4 md:mt-0 md:h-[200px] md:max-h-fit md:w-[45%] md:max-w-[45%] md:flex-row">
        <p className="w-full">
          📢Last seen in{" "}
          <span className="font-semibold">{vistoPorUltimaVez}</span>
        </p>
        <p className="w-full">
          🐾 Responds to <span className="font-semibold">{nombre}</span>
        </p>
        <p className="w-full">
          🎒 Has: <span className="font-semibold">{accesorios}</span>
        </p>
        <p className="w-full">
          📞 Owner Contact:{" "}
          <span className="font-semibold">{infoContacto}</span>
        </p>
      </div>
    </div>
  );
};

export default LostPetCard;
