const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user"); //importamos el modelo de usuario
const router = require("express").Router(); //importamos el router de express

router.post("/", async (req, res) => {
  const {
    correo,
    nombre,
    username,
    contraseña,
    nombreMascota,
    animal,
    edad,
    descripcion,
    rol,
  } = req.body; //obtenemos los datos del body

  if (!!!correo || !!!contraseña || !!!nombre || !!!username || !!!rol) {
    //verificamos si los campos estan vacios
    return res.status(400).json(
      jsonResponse(400, {
        //retornamos un json con el mensaje de error
        error: "Los campos son requeridos",
      })
    );
  }

  try {
    //Se crea el usuario en la base de datos
    const user = new User();
    const exists = await user.usernameExist(username);
    const existsCorreo = await user.correoExist(correo);

    if (exists) {
      //Se revisa si existe el username
      return res.status(400).json(
        jsonResponse(400, {
          error: "The username is already taken",
        })
      );
    }

    if (existsCorreo) {
      //Se revisa si el correo esta asociado a otro cuenta
      return res.status(400).json(
        jsonResponse(400, {
          error: "The email is already taken",
        })
      );
    }

    //Si el username y correo son validos se crea el usuario
    const newUser = new User({
      correo,
      nombre,
      username,
      contraseña,
      rol,
    });

    // Solo agregamos la mascota si se proporciona al menos su nombre
    if (nombreMascota) {
      newUser.mascotas.push({
        nombreMascota,
        animal,
        edad,
        descripcion,
      });
    }
/*
    // Agrega la mascota proporcionada al array de mascotas del usuario
    newUser.mascotas.push({
      nombreMascota,
      animal,
      edad,
      descripcion,
    });
*/
    //const newUser = new User({ correo, username, contraseña, nombre, nombreMascota, animal, edad, descripcion, rol });

    newUser.save();
    res
      .status(200)
      .json(jsonResponse(200, { message: "User created successfully" }));
  } catch (error) {
    console.log("Error creating user", { error });
  }
});

router.post("/addPet", async (req, res) => {
  const {
    nombreMascotaNueva,
    animalNueva,
    edadNueva,
    descripcionNueva,
    idUsuario,
  } = req.body;

  if (
    !!!nombreMascotaNueva ||
    !!!animalNueva ||
    !!!edadNueva ||
    !!!descripcionNueva ||
    !!!idUsuario
  ) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Los campos son requeridos",
      })
    );
  }

  try {
    // verifica si el idUsuario corresponde a un usuario valido
    const userExists = await User.exists({ _id: idUsuario });

    if (!userExists) {
      return res.status(404).json(
        jsonResponse(404, {
          error: "Usuario no encontrado",
        })
      );
    }

    const pet = {
      nombreMascota: nombreMascotaNueva,
      animal: animalNueva,
      edad: edadNueva,
      descripcion: descripcionNueva,
    };

    // Encuentra el usuario y actualiza su array de mascotas
    await User.findByIdAndUpdate(
      idUsuario,
      { $push: { mascotas: pet } },
      { new: true }
    );

    res
      .status(200)
      .json(jsonResponse(200, { message: "Pet added successfully" }));
  } catch (error) {
    console.log("Error adding pet", { error });
    res;
  }
});
module.exports = router;
