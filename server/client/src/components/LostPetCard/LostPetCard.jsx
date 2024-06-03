const LostPetCard = ({ pet }) => {
  // Recibe objeto pet directamente y desestructura sus propiedades
  const { nombre, imageURL, infoContacto, accesorios, vistoPorUltimaVez } = pet;
  return (
    <div className="flex flex-row rounded-lg bg-[#90d8d4] p-3 shadow-lg lg:m-2 lg:w-[45%]">
      <div className="w-1/2">
        <h3 className="text-xl font-bold">{nombre}</h3>
        <img
          className="rounded-lg"
          src={`http://localhost:4000${imageURL}`}
          alt="lost pet"
        />
      </div>
      <div className="ml-2 flex w-1/2 flex-col justify-center text-sm">
        <p>
          🗺️Last seen in{" "}
          <span className="font-semibold">{vistoPorUltimaVez}</span>
        </p>
        <p>
          🐾 Responds to <span className="font-semibold">{nombre}</span>
        </p>
        <p>
          🎒 Has: <span className="font-semibold">{accesorios}</span>
        </p>
        <p>
          📞 Owner Contact:{" "}
          <span className="font-semibold">{infoContacto}</span>
        </p>
      </div>
    </div>
  );
};

export default LostPetCard;
