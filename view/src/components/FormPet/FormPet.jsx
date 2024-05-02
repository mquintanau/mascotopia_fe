import { useState } from "react";
import Button from "../Button/Button";
import { API_URL } from "../../auth/constants";
import Swal from "sweetalert2";

const FormPet = () => {
  // Estados para la nueva mascota
  const [nombreMascotaNueva, setNombreMascotaNueva] = useState("");
  const [animalNueva, setAnimalNueva] = useState("");
  const [edadNueva, setEdadNueva] = useState("");
  const [descripcionNueva, setDescripcionNueva] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  // Función para manejar el clic en la "x" y ocultar el componente
  const handleCloseClick = () => {
    setIsVisible(false);
  };

  // Verifica si el componente debe mostrarse o no
  if (!isVisible) {
    return null; // Si isVisible es false, el componente no se renderiza
  }

  async function submitNewPetForm(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup/addPet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //Se envian los datos del formulario en formato JSON al servidor
          nombreMascotaNueva,
          animalNueva,
          descripcionNueva,
          edadNueva,
        }),
      });

      if (response.ok) {
        console.log("Tu mascota se creó correctamente!");
        Swal.fire({
          title: "Success!",
          text: "Your pet was created successfully!",
          icon: "success",
          confirmButtonText: "Continue",
        });
      } else {
        console.log(
          "There was an unexpected error! Please contact an administrator.",
        );
        const json = await response.json();
        if (json && json.body && typeof json.body.error === "string") {
          // json tiene la estructura de AuthResponseError
          if (json.body.error) {
            Swal.fire({
              title: "¡Error!",
              text: json.body.error,
              icon: "error",
              confirmButtonText: "Continue",
              confirmButtonColor: "#f27474",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "¡Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }

  return (
    <div>
      <form
        action=""
        className="my-8 flex min-h-[250px] min-w-[300px] justify-center rounded-[13px] bg-[#A4F3B3]"
      >
        <div className="flex items-center justify-center">
          <div className="relative m-4 mb-4 h-[175px] w-[175px] justify-center overflow-hidden rounded-full">
            <img
              src="view/public/shared/EjemploPet.jpg"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="my-4 flex flex-col justify-start border-l-4 border-primary px-4 text-[15px] font-light text-black">
            <div className="mb-4 mt-4 flex flex-col items-center">
              <input
                type="text"
                value={nombreMascotaNueva}
                onChange={(e) => setNombreMascotaNueva(e.target.value)}
                className="mb-2 rounded-lg bg-navbar  py-2  text-white placeholder-gray-400"
                placeholder=" Name"
              />
              <input
                type="text"
                value={animalNueva}
                onChange={(e) => setAnimalNueva(e.target.value)}
                className="mb-2 rounded-lg bg-navbar py-2  text-white placeholder-gray-400"
                placeholder=" Animal"
              />
              <input
                type="text"
                value={edadNueva}
                onChange={(e) => setEdadNueva(e.target.value)}
                className="mb-2 rounded-lg bg-navbar py-2  text-white placeholder-gray-400"
                placeholder=" Age"
              />
              <input
                type="text"
                value={descripcionNueva}
                onChange={(e) => setDescripcionNueva(e.target.value)}
                className="mb-2 rounded-lg bg-navbar py-2  text-white placeholder-gray-400"
                placeholder=" Description"
              />
              <div className="justify-center">
                <Button className="mx-4 mt-4" onClick={submitNewPetForm}>
                  ✓
                </Button>
                <Button onClick={handleCloseClick} className="mx-4 mt-4">
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
