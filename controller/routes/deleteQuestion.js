const express = require("express");
const router = express.Router();
const Forum = require("../schema/forum");

router.delete("/", async (req, res) => {
    try {
      const { id, idTopic } = req.body;
      console.log(id)
      // Find and delete the event by ID
      const forum = await Forum.findById(idTopic); // Ensure that the Event object is properly defined
      const question = forum.preguntas.find(question => question.id === id);
      if (!question) {
        return res.status(404).send('No se encontró ninguna pregunta con el ID proporcionado');
      }
      forum.preguntas.pull(question);
      await forum.save();
      res.sendStatus(201);
    } catch (error) {
      console.error("Error al borrar el evento:", error);
      res.sendStatus(500);
    }
  });

module.exports = router; //exportamos el router para que pueda ser utilizado en otros archivos