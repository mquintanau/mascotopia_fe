const router = require("express").Router(); //importamos el router de express
const User = require("../schema/user"); //importamos el modelo de usuario
const { v4: uuidv4 } = require("uuid"); //importamos la libreria uuid para generar un id unico


//Crea ruta post para subir imageURL de mascota perdida
router.post("/sendImage/:idUsuario", upload.single("image"), async (req, res) => {
  try{
    const ImageURL = "/uploads/" + req.file.filename; //Guarda la ruta de la imagen
    res.status(201).send({ imageURL: ImageURL }); //Envía la respuesta exitosa
  } catch (error) {
    res.status(500).send({ error: "Server error" }); //Envía la respuesta de error
  }
});







//Crea ruta post para hacer push de mascota perdida
router.post("/sendPet", async (req, res) => {
  const {nombre, vistoPorUltimaVez, respondeA, accesorios, infoContacto, imageURL, idUsuario } = req.body; //obtenemos los datos de la mascota

  //Si el idUsuario esta en la base de datos entonces...
    User.findById(idUsuario).then(async (user) => {

        if (user) {
        //Genera idMascotaPerdida unico
        const idMascotaPerdida = uuidv4();
        //Hace push de la mascota perdida
            user.mascotasPerdidas.push({
            idMascotaPerdida,
            nombre,
            vistoPorUltimaVez,
            respondeA,
            accesorios,
            infoContacto,
            comentarios: [],
            numComentarios: 0,
            imageURL,
        });
        user.save();
        res.status(201).json({ user });
        } else {
        res.status(404).json({ error: "User not found" });
        }
    });
    


});


//Crea ruta get para obtener todas las mascotas perdidas
router.get("/getPets", async (req, res) => {
    try {
      //Obtiene todos los usuarios y selecciona solo el campo mascotasPerdidas
      const users = await User.find().select('mascotasPerdidas'); //obtenemos sólo el campo mascotasPerdidas de todos los usuarios
      //Concatena todas las mascotas perdidas de todos los usuarios
      let allLostPets = [];
      users.forEach(user => {
        allLostPets = allLostPets.concat(user.mascotasPerdidas);
      });
      res.status(200).json({ allLostPets }); //retornamos un json con todas las mascotas perdidas
    } catch (error) {
      res.status(400).json({ error }); //retornamos un json con el error
    }
  });






module.exports = router; //exportamos el router