const { jsonResponse } = require("../lib/jsonResponse"); //Generar respuestas JSON en el formato adecuado
const ForumModel = require("../schema/forum"); //importamos el modelo de usuario (archivo contiene la definición del esquema del modelo de usuario con Mongoose.)
const router = require("express").Router(); //importamos el router de express
const getUserInfo = require("../lib/getUserInfo"); //importamos la funcion para obtener la informacion del usuario

router.get("/", async (req, res) => {
  try {
    //obtiene todos los foros existentes
    ForumModel.find()
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } catch (error) {
    res.status(500).json(
      jsonResponse(500, {
        //retornamos un json con el mensaje de error
        error: "Internal Server Error",
      })
    );
  }
});

router.get("/:id", async (req, res) => {
  try {
    const forumId = req.params.id;
    //obtiene el foro específico por su id
    ForumModel.findById(forumId)
      .then((result) => {
        if (result) {
          res.json(result);
        } else {
          res.status(404).json(
            jsonResponse(404, {
              error: "Forum not found",
            })
          );
        }
      })
      .catch((err) => res.json(err));
  } catch (error) {
    res.status(500).json(
      jsonResponse(500, {
        error: "Internal Server Error",
      })
    );
  }
});

module.exports = router; //exportamos el router para que pueda ser utilizado en otros archivos
