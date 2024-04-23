const { jsonResponse } = require("../lib/jsonResponse"); //Generar respuestas JSON en el formato adecuado
const ForumModel = require("../schema/forum"); //importamos el modelo de usuario (archivo contiene la definición del esquema del modelo de usuario con Mongoose.)
const router = require("express").Router(); //importamos el router de express
const getUserInfo = require("../lib/getUserInfo"); //importamos la funcion para obtener la informacion del usuario

router.post("/", async (req, res) => {
  try {
    const { id, titulo, descripcion, fecha, autor, respuestas, numRespuestas } =
      req.body; //obtenemos los datos del body
    ForumModel.findByIdAndUpdate(id).then((forum) => {
      //buscamos el foro por id
      if (forum) {
        //si existe el foro
        forum.preguntas.push({
          //agregamos una pregunta al foro
          id,
          titulo,
          descripcion,
          fecha,
          autor,
          respuestas,
          numRespuestas,
        });
        forum.numPreguntas = forum.preguntas.length; //actualizamos el numero de preguntas
        forum.save(); //guardamos el foro
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
