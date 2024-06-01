const router = require("express").Router(); //importamos el router de express
const User = require("../schema/user"); //importamos el modelo de usuario
const ActivityLog = require("../schema/ActivityLog"); //importamos el modelo de log de actividades

//Crea ruta post para hacer comentario en mascota perdida
router.post("/:idMascota/:idUsuario", async (req, res) => {
    const {respuesta} = req.body; //obtenemos los datos del comentario
    const user = await User.findById(req.params.idUsuario); //buscamos el usuario por su id
    if (user) {
      const mascotaPerdida = user.mascotasPerdidas.id(req.params.idMascota); //buscamos la mascota perdida por su id
      const autor = user.nombre; //obtenemos el nombre del autor del comentario
      if (mascotaPerdida) {
        //obtenemos la fecha actual
        fecha = new Date();
        mascotaPerdida.comentarios.push({ respuesta, fecha, autor }); //hacemos push del comentario
        mascotaPerdida.numComentarios = mascotaPerdida.numComentarios + 1; //incrementamos el numero de comentarios
        await user.save();
        const newActivity = new ActivityLog({ //creamos un nuevo registro en el log de actividades
          idUsuario: user._id,
          nombre: user.nombre,
          accion: "Comment lost pet added",
          fecha: new Date(),
        });
        await newActivity.save(); //guardamos el registro en la base de datos
        res.status(201).json({ user }); //retornamos un json con el usuario
      } else {
        res.status(404).json({ error: "Lost pet not found" }); //retornamos un json con el error
      }
    } else {
      res.status(404).json({ error: "User not found" }); //retornamos un json con el error
    }
  });


module.exports = router; //exportamos el router