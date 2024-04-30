const { jsonResponse } = require("../lib/jsonResponse"); //Generar respuestas JSON en el formato adecuado
const ForumModel = require("../schema/forum"); //importamos el modelo de usuario (archivo contiene la definición del esquema del modelo de usuario con Mongoose.)
const router = require("express").Router(); //importamos el router de express
const getUserInfo = require("../lib/getUserInfo"); //importamos la funcion para obtener la informacion del usuario
const { AnswerSchema } = require("../schema/forum"); //importamos el esquema de respuesta
const { QuestionSchema } = require("../schema/forum"); //importamos el esquema de pregunta

router.post("/answer/:questionId", async (req, res) => {
    try {
        const { questionId } = req.params;
        const { userId, answerText } = req.body;

        // Check if the question exists
        const question = await QuestionSchema.findById(questionId);
        if (!question) {
            return jsonResponse(res, 404, "Question not found");
        }

        // Get user information
        const userInfo = await getUserInfo(userId);
        if (!userInfo) {
            return jsonResponse(res, 404, "User not found");
        }

        // Create a new answer
        const newAnswer = new AnswerSchema({
            questionId,
            userId,
            answerText,
            createdAt: new Date(),
        });

        // Save the answer to the database
        await newAnswer.save();

        return jsonResponse(res, 200, "Answer posted successfully");
    } catch (error) {
        console.error(error);
        return jsonResponse(res, 500, "Internal server error");
    }
});

router.get("/answers/:questionId", async (req, res) => {
    try {
        const { questionId } = req.params;
        // Check if the question exists
        const question = await QuestionSchema.findById(questionId);
        if (!question) {
            return jsonResponse(res, 404, "Question not found");
        }
        // Get all answers for the question and sort them by createdAt in descending order
        const answers = await AnswerSchema.find({ questionId }).sort({ createdAt: -1 });
        return jsonResponse(res, 200, answers);
    } catch (error) {
        console.error(error);
        return jsonResponse(res, 500, "Internal server error");
    }
});

module.exports = router;