
const router = require("express").Router();   //importamos el router de express
const Post = require("../schema/post") //importamos el modelo de post

//Creamos ruta post para guardar post
router.post("/sendPost/", async (req, res) => {
  const { titulo, tipo, descripcion, fecha, autor, numComentarios, numLikes, imgUrl } = req.body; //obtenemos los datos del post
  const post = new Post({
    titulo,
    tipo,
    descripcion,
    fecha,
    autor,
    numComentarios,
    numLikes,
    imgUrl,
  });

  try {
    await post.save(); //guardamos el post
    res.status(201).json({ post }); //retornamos un json con el post guardado
  } catch (error) {
    res.status(400).json({ error }); //retornamos un json con el error
  }
});



module.exports = router; //exportamos el router