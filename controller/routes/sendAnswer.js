const { jsonResponse } = require("../lib/jsonResponse"); //Generar respuestas JSON en el formato adecuado
const ForumModel = require("../schema/forum"); //importamos el modelo de usuario (archivo contiene la definición del esquema del modelo de usuario con Mongoose.)
const router = require("express").Router(); //importamos el router de express
const getUserInfo = require("../lib/getUserInfo"); //importamos la funcion para obtener la informacion del usuario
// const { AnswerSchema } = require("../schema/forum"); //importamos el esquema de respuesta
// const { QuestionSchema } = require("../schema/forum"); //importamos el esquema de pregunta
// const { ForumModel } = require("../schema/forum");

//Ruta para enviar una respuesta a una pregunta
router.post("/", async (req, res) => {
    try {
        const { questionId, respuesta, fecha, autor } = req.body; //obtenemos los datos del body
        
        const update = {
            $push: { "preguntas.$.respuestas": { id: questionId, respuesta, fecha, autor } },
            $inc: { "preguntas.$.numRespuestas": 1 }
        };
        ForumModel.findOneAndUpdate({ "preguntas.id": questionId }, update, { new: true }).then((forum) => {
            //buscamos la pregunta por id
            if (forum) {
                //si existe la pregunta
                res.status(200).json(
                    jsonResponse(200, {
                        //retornamos un json con el mensaje de exito
                        message: "Answer added successfully",
                    })
                );
            } else {
                res.status(404).json(
                    jsonResponse(404, {
                        //retornamos un json con el mensaje de error
                        error: "Question not found",
                    })
                );
            }
        });
    } catch (error) {
        console.error(error);
        return jsonResponse(res, 500, "Internal server error");
    }
});
module.exports = router;