const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user"); //importamos el modelo de usuario
const router = require("express").Router(); //importamos el router de express
const getUserInfo = require("../lib/getUserInfo"); //importamos la funcion para obtener la informacion del usuario
const jwt = require("jsonwebtoken"); //importamos la libreria de jwt
const nodemailer = require("nodemailer");
const ActivityLog = require("../schema/ActivityLog"); //importamos el modelo de log de actividades
require("dotenv").config();

//verificamos si los campos estan vacios
router.post("/", async (req, res) => {
  const { correo, nombre } = req.body;
  if (!correo || !nombre) {
    //retornamos un json con el mensaje de error
    return res.status(400).json(
      jsonResponse(400, {
        error: "The fields are required",
      })
    );
  }

  const user = await User.findOne({ correo });

  if (!user) {
    //si el correo no existe
    return res.status(404).json(
      jsonResponse(404, {
        error: "Email not found",
      })
    );
  }
  const name = await User.findOne({ nombre });
  if (!name) {
    //si el nombre no existe
    return res.status(404).json(
      jsonResponse(404, {
        error: "Name not found",
      })
    );
  }

  //generamos un token
  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  var transporter = nodemailer.createTransport({
    service: "gmail", //servicio de correo
    auth: {
      //autenticacion
      user: "mascotopiapp@gmail.com", //correo de donde se envia
      pass: "eopm wamh nfvx fpii", //controller de donde se envia esta contraseña es especifica de la aplicación
      //y se obtiene en gmail
    },
  });

  var mailOptions = {
    from: correo, //correo a donde se envia
    to: "juandamadrid7@gmail.com", //correo a donde se envia
    subject: "Reset Your Password", //asunto del correo
    text: `http://localhost:5173/resetPassword/${user._id}/${token}`, //Texto del correo
  };
  transporter.sendMail(mailOptions,async function (error, info) {
    if (error) {
      return res.status(500).json(
        jsonResponse(500, {
          error: "Error sending email",
        })
      );
    } else {
      const newActivity = new ActivityLog({
        //creamos un nuevo registro en el log de actividades
        idUsuario: user._id,
        nombre: user.nombre,
        accion: "Forgot password",
        fecha: new Date(),
      });
      
      await newActivity.save(); //guardamos el registro en la base de datos

      return res.send({ Status: "Correo enviado" });
    }
  });
});

module.exports = router;
