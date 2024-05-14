const express = require("express");
const router = express.Router();
const Forum = require("../schema/forum");
const ActivityLog = require("../schema/ActivityLog");

router.delete("/", async (req, res) => {
  try {
    const { id, idForum, idQuestion, user } = req.body;
    // Find and delete the event by ID
    const forum = await Forum.findById(idForum); // Ensure that the Event object is properly defined
    let question = forum.preguntas.find(
      (question) => question.id === idQuestion
    );
    if (!question) {
      let questionNumber = Number(idQuestion);
      question = forum.preguntas.find(
        (question) => question.id === questionNumber
      );
    }

    const answer = question.respuestas.find((answer) => answer._id == id);
    console.log("id Respuesta", id);
    console.log(question.respuestas);

    if (!answer) {
      return res
        .status(404)
        .send("Did not found any answer with the provided ID");
    }
    if (!question) {
      return res
        .status(404)
        .send("Did not found any question with the provided ID");
    }

    question.respuestas.pull(answer);
    question.numRespuestas = question.respuestas.length;

    await forum.save();

    newActivity = new ActivityLog({
      idUsuario: user._id,
      nombre: user.nombre,
      accion: "Answer Deleted",
      fecha: new Date(),
    });

    await newActivity.save();
    res.sendStatus(201);
  } catch (error) {
    console.error("Error al borrar el evento:", error);
    res.sendStatus(500);
  }
});

module.exports = router; //exportamos el router para que pueda ser utilizado en otros archivos
