const router = require("express").Router(); //importamos el router de express
const Post = require("../schema/post"); //importamos el modelo de post
const User = require("../schema/user"); //importamos el modelo de usuario
const ActivityLog = require("../schema/ActivityLog"); //importamos el modelo de log de actividades

//crea ruta para hacer comentario
router.post("/:idPost/:idUsuario", async (req, res) => {
  const { respuesta } = req.body; //obtenemos los datos del comentario
  const post = await Post.findById(req.params.idPost); //buscamos el post por su id
  const user = await User.findById(req.params.idUsuario); //buscamos el usuario por su id
  //obtenemos la fecha actual
  if (post && user) {
    fecha = new Date();
    const autor = user._id; //obtenemos el nombre del autor del comentario
    post.comentarios.push({ respuesta, fecha, autor }); //hacemos push del comentario
    post.numComentarios = post.numComentarios + 1; //incrementamos el numero de comentarios
    post.save();
    const newActivity = new ActivityLog({ //creamos un nuevo registro en el log de actividades
      idUsuario: req.params.idUsuario,
      nombre: user.nombre,
      accion: "Reply post created",
      fecha: new Date(),
    });
    await newActivity.save(); //guardamos el registro en la base de datos
    res.status(201).json({ post }); //retornamos un json con el post
  } else {
    res.status(404).json({ error: "Post not found" }); //retornamos un json con el error
  }
});


module.exports = router; //exportamos el router