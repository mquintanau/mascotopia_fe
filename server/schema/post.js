import ReplySchema from "./reply";
const mongoose = require("mongoose"); //importamos la libreria mongoose para manejar los esquemas

// Esquema para la coleccion post
const PostSchema = new mongoose.Schema({
  id: { type: Object },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  autor: { type: String, required: true },
  numComentarios: { type: Number, required: false },
  numLikes: { type: Number, required: false },
  imgUrl: { type: String, required: false },
  comentarios: [ReplySchema],
});
