const mongoose = require("mongoose"); //importamos la libreria mongoose para manejar los esquemas
const ReplySchema = require("./reply"); //importamos el esquema de respuesta
// Esquema para la coleccion post
const PostSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  tipo: { type: String, enum: ["featured", "local"], required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  autor: { type: String, required: true },
  autorImageURL: { type: String, required: false },
  numComentarios: { type: Number, required: false },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  ],
  numLikes: { type: Number, required: false },
  imageURL: { type: String, required: false },
  comentarios: [ReplySchema],
});

// Exportamos el esquema
module.exports = mongoose.model("Post", PostSchema);
