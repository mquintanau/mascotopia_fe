const { jsonResponse } = require("../lib/jsonResponse"); //Generar respuestas JSON en el formato adecuado
const ForumModel = require("../schema/forum"); //importamos el modelo de usuario (archivo contiene la definición del esquema del modelo de usuario con Mongoose.)
const router = require("express").Router(); //importamos el router de express
const getUserInfo = require("../lib/getUserInfo"); //importamos la funcion para obtener la informacion del usuario
const { v4: uuidv4 } = require("uuid"); //importamos la libreria uuid para generar un id unico
const ActivityLog = require("../schema/ActivityLog"); //importamos el modelo de log de actividades

router.post("/", async (req, res) => {
  try {
    const { forumId, titulo, descripcion, idUsuario, autor } = req.body; //obtenemos los datos del body

    ForumModel.findByIdAndUpdate(forumId).then(async (forum) => {
      //buscamos el foro por id
      if (forum) {
        const id = uuidv4(); //generamos un id unico
        const fecha = new Date(); //obtenemos la fecha actual
        //si existe el foro
        forum.preguntas.push({
          //agregamos una pregunta al foro
          id,
          titulo,
          descripcion,
          fecha,
          autor: autor,
          respuestas: [],
          numRespuestas: 0,
        });
        forum.numPreguntas = forum.preguntas.length; //actualizamos el numero de preguntas
        forum.save(); //guardamos el foro


        const newActivity = new ActivityLog({//creamos un nuevo registro en el log de actividades
          idUsuario: idUsuario,
          nombre: autor,
          accion: "Question added to forum",
          fecha: new Date()
        });
    
        await newActivity.save();


        res.status(200).json(
          jsonResponse(200, {
            //retornamos un json con el mensaje de exito
            message: "Question added successfully",
          })
        );

      } else {
        res.status(404).json(
          jsonResponse(404, {
            //retornamos un json con el mensaje de error
            error: "Forum not found",
          })
        );
      }
    });
  } catch (error) {
    res.status(500).json(
      jsonResponse(500, {
        //retornamos un json con el mensaje de error
        error: "Internal Server Error",
      })
    );
  }
});

module.exports = router; //exportamos el router para que pueda ser utilizado en otros archivos
