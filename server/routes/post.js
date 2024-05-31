
const router = require("express").Router();   //importamos el router de express
const Post = require("../schema/post") //importamos el modelo de post

//Crea ruta post para guardar post
router.post("/sendPost/", async (req, res) => {
  const { titulo, tipo, descripcion, fecha, autor, imageURL } = req.body; //obtenemos los datos del post
  const post = new Post({
    titulo,
    tipo,
    descripcion,
    fecha,
    autor,
    numComentarios: 0,
    numLikes: 0,
    imageURL,
  });

  try {
    await post.save(); //guardamos el post
    res.status(201).json({ post }); //retornamos un json con el post guardado
  } catch (error) {
    res.status(400).json({ error }); //retornamos un json con el error
  }
});


//Crea ruta get para obtener todos los post
router.get("/getPosts/", async (req, res) => {
  try {
    const posts = await Post.find(); //obtenemos todos los post
    res.status(200).json({ posts }); //retornamos un json con todos los post
  } catch (error) {
    res.status(400).json({ error }); //retornamos un json con el error
  }
});

//Crea ruta get para obtener un post por su id
router.get("/getPost/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //obtenemos el post por su id
    res.status(200).json({ post }); //retornamos un json con el post
  } catch (error) {
    res.status(400).json({ error }); //retornamos un json con el error
  }
});

//Crea ruta get para obtener los posts por tipo "local"
router.get("/getLocalPosts/", async (req, res) => {
  try {
    const posts = await Post.find({ tipo: "local" }); //obtenemos los post por tipo "local"
    res.status(200).json({ posts }); //retornamos un json con los post
  } catch (error) {
    res.status(400).json({ error }); //retornamos un json con el error
  }
});

//Crea ruta get para obtener los posts por tipo "featured"
router.get("/getFeaturedPosts/", async (req, res) => {
  try {
    const posts = await Post.find({ tipo: "featured" }); //obtenemos los post por tipo "featured"
    res.status(200).json({ posts }); //retornamos un json con los post
  } catch (error) {
    res.status(400).json({ error }); //retornamos un json con el error
  }
});



module.exports = router; //exportamos el router