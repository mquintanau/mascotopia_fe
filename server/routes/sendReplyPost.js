const router = require("express").Router(); //importamos el router de express
const Post = require("../schema/post"); //importamos el modelo de post

//crea ruta para hacer comentario
router.post("/:id", async (req, res) => {
  const { respuesta, autor } = req.body; //obtenemos los datos del comentario
  const post = await Post.findById(req.params.id); //buscamos el post por su id
  //obtenemos la fecha actual
  if (post) {
    fecha = new Date();
    post.comentarios.push({ respuesta, fecha, autor }); //hacemos push del comentario
    post.numComentarios = post.numComentarios + 1; //incrementamos el numero de comentarios
    post.save();
    res.status(201).json({ post }); //retornamos un json con el post
  } else {
    res.status(404).json({ error: "Post not found" }); //retornamos un json con el error
  }
});


module.exports = router; //exportamos el router