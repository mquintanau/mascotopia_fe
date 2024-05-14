const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser"); // Import the body-parser package

require("dotenv").config();

const port = process.env.PORT || 4000; //puerto del servidor
app.use(cors()); //permite que el servidor acepte peticiones de cualquier origen
app.use(express.json()); //permite que el servidor pueda recibir y enviar datos en formato JSON
app.use("/uploads", express.static(path.join(__dirname, "/routes/uploads"))); //Permite manejo de archivos estáticos
app.use(bodyParser.json());

//CONEXIÓN CON LA BASE DE DATOS
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("DB connected");
  } catch (error) {
    console.error(error);
  }
}

connectDB();

// RUTAS

// CALENDARIO
app.use("/api/calendar", require("./routes/calendar"));

// USUARIO
app.use("/api/login", require("./routes/login"));
app.use("/api/userProfile", require("./routes/userProfile"));
app.use("/api/signup", require("./routes/signup"));
app.use("/api/forgotPassword", require("./routes/forgotPassword"));
app.use("/api/resetPassword", require("./routes/resetPassword"));
app.use("/api/imageProfile", require("./routes/imageProfile"));

// FORO
app.use("/api/forum", require("./routes/forum")); // Ruta get de los foros
app.use("/api/sendQuestion", require("./routes/sendQuestion")); // Ruta para post de las preguntas
app.use("/api/sendAnswer", require("./routes/sendAnswer")); // Ruta para post de las respuestas
app.use("/api/deleteQuestion", require("./routes/deleteQuestion")); // Ruta para eliminar preguntas
app.use("/api/deleteAnswer", require("./routes/deleteAnswer")); // Ruta para eliminar preguntas

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
