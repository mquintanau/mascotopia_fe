const express = require("express");
const router = express.Router();
const Forum = require("../schema/forum");
const ActivityLog = require("../schema/ActivityLog");

router.delete("/", async (req, res) => {
  try {
    const { idQuestion, idForum, usuario } = req.body;
    // Find and delete the event by ID
    const forum = await Forum.findById(idForum); // Ensure that the Event object is properly defined
    const question = forum.preguntas.find(
      (question) => question.id == idQuestion
    );
    if (!question) {
      return res
        .status(404)
        .send("No se encontró ninguna pregunta con el ID proporcionado");
    }

    forum.preguntas.pull(question);
    forum.numPreguntas = forum.preguntas.length;

    await forum.save();

    newActivity = new ActivityLog({
      idUsuario: usuario._id,
      nombre: usuario.nombre,
      accion: "Question deleted",
      fecha: new Date(),
    });

    await newActivity.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al borrar el evento:", error);
    res.sendStatus(500);
  }
});

module.exports = router; //exportamos el router para que pueda ser utilizado en otros archivos
