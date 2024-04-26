import { useState } from 'react';
import Button from '../Button/Button';

const FormPet = () => {
  // Estados para la nueva mascota
  const [nombreMascotaNueva, setNombreMascotaNueva] = useState("");
  const [animalNueva, setAnimalNueva] = useState("");
  const [edadNueva, setEdadNueva] = useState("");
  const [descripcionNueva, setDescripcionNueva] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  

  // Función para agregar una nueva mascota
  function agregarNuevaMascota() {
    const nuevaMascota = {
      nombreMascota: nombreMascotaNueva,
      animal: animalNueva,
      edad: edadNueva,
      descripcion: descripcionNueva,
    };
  }

    // Función para manejar el clic en la "x" y ocultar el componente
    const handleCloseClick = () => {
      setIsVisible(false);
    };
  
    // Verifica si el componente debe mostrarse o no
    if (!isVisible) {
      return null; // Si isVisible es false, el componente no se renderiza
    }

    

  return (
    <div>
      <form
        action=""
        className="flex my-8 min-h-[250px] min-w-[300px] justify-center rounded-[13px] bg-[#A4F3B3]"
      >
        <div className="flex items-center justify-center">
          <div className="relative m-4 mb-4 h-[175px] w-[175px] justify-center overflow-hidden rounded-full">
            <img
              src="view/public/shared/EjemploPet.jpg"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-start border-l-4 border-primary px-4 text-[15px] font-light text-black my-4">
            <div className="flex flex-col mt-4 mb-4 items-center">
              <input
                type="text"
                value={nombreMascotaNueva}
                onChange={(e) => setNombreMascotaNueva(e.target.value)}
                className="bg-navbar text-white placeholder-gray-400  rounded-lg  py-2 mb-2"
                placeholder=" Name"
              />
              <input
                type="text"
                value={animalNueva}
                onChange={(e) => setAnimalNueva(e.target.value)}
                className="bg-navbar text-white placeholder-gray-400 rounded-lg  py-2 mb-2"
                placeholder=" Animal"
              />
              <input
                type="text"
                value={edadNueva}
                onChange={(e) => setEdadNueva(e.target.value)}
                className="bg-navbar text-white placeholder-gray-400 rounded-lg  py-2 mb-2"
                placeholder=" Age"
              />
              <input
                type="text"
                value={descripcionNueva}
                onChange={(e) => setDescripcionNueva(e.target.value)}
                className="bg-navbar text-white placeholder-gray-400 rounded-lg  py-2 mb-2"
                placeholder=" Description"
              />
              <div className='justify-center'>
            <Button className='mx-4 mt-4'>
            ✓
            </Button>
            <Button onClick={handleCloseClick} className='mx-4 mt-4'>
            ✖
            </Button>
          </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormPet;
