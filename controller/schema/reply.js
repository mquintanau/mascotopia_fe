const mongoose = require("mongoose"); //importamos la libreria mongoose para manejar los esquemas

// Esquema para la subcolección pregunta
const ReplySchema = new mongoose.Schema({
  respuesta: { type: String, required: true },
  fecha: { type: Date, required: true },
  autor: { type: String, required: true },
});

module.exports = mongoose.model("Reply", ReplySchema); //exportamos el modelo de usuario
