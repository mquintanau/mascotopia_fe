const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const path = require('path');

require("dotenv").config();

const port = process.env.PORT || 4000; //puerto del servidor
app.use(cors()); //permite que el servidor acepte peticiones de cualquier origen
app.use(express.json()); //permite que el servidor pueda recibir y enviar datos en formato JSON
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); //Permite manejo de archivos estáticos

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

//RUTAS
app.use("/api/login", require("./routes/login"));
app.use("/api/userProfile", require("./routes/userProfile"));
app.use("/api/signup", require("./routes/signup"));
app.use("/api/forgotPassword", require("./routes/forgotPassword"));
app.use("/api/resetPassword", require("./routes/resetPassword"));
app.use("/api/imageProfile", require("./routes/imageProfile"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
