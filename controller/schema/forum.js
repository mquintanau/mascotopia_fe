const mongoose = require("mongoose"); //importamos la libreria mongoose para manejar los esquemas

// Esquema para la subcolección pregunta
const QuestionSchema = new mongoose.Schema({
  id: { type: Object },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  autor: { type: String, required: true },
  respuestas: { type: Array, required: false },
  numRespuestas: { type: Number, required: false },
});

// Esquema para la subcolección foro
const ForumSquema = new mongoose.Schema({
  id: { type: Object },
  titulo: { type: String, required: true },
  preguntas: [QuestionSchema], // Referencia al esquema de la subcolección pregunta
  numPreguntas: { type: Number, required: false },
});

module.exports = mongoose.model("Forum", ForumSquema); //exportamos el modelo de usuario
