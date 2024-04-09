import { useState } from "react";
import { API_URL } from "../auth/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function Signup() {
    // Variables de estado formulario
    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [username, setUsername] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [nombreMascota, setnombreMascota] = useState("");
    const [animal, setAnimal] = useState("");
    const [edad, setEdad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [rol, setRol] = useState("");
      // Se inicializa el estado de la respuesta de error
    const [errorResponse, setErrorResponse] = useState("");
      // Se obtiene la función de autenticación
    const auth = useAuth();
      // Se inicializa la variable de navegación
    const goTo = useNavigate();

    // Función que se ejecuta al enviar el formulario
    async function handleSumit(e){
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signup`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    //Se envian los datos del formulario en formato JSON al servidor
                    correo,
                    nombre,
                    username,
                    contraseña,
                    nombreMascota,
                    animal,
                    edad,
                    descripcion,
                    rol
                  }),
            })

            if (response.ok) {
                console.log("El usuario se creo correctamente"); 
                setErrorResponse(""); //Se limpia el estado de la respuesta de error

                goTo("/login"); //Se redirige a la página de login
            }else{
                console.log("Hubo un error en el registro");
                if (json && json.body && typeof json.body.error === "string") {
                    setErrorResponse(json.body.error);
                    // json tiene la estructura de AuthResponseError
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}