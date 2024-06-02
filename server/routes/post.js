const multer = require("multer");
const path = require("path");
const router = require("express").Router();   //importamos el router de express
const Post = require("../schema/post") //importamos el modelo de post
const User = require("../schema/user") //importamos el modelo de usuario
const ActivityLog = require("../schema/ActivityLog") //importamos el modelo de log de actividades

//Crea ruta post para guardar post
//Creacion y verificacion automatica de la carpeta uploads
const fs = require("fs");
const dirPath = path.join(__dirname, "/uploads");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads")); // Ubicación de la carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    ); // Nombre del archivo
  },
});

const upload = multer({ storage: storage });
//Crea ruta post para subir imageURL de mascota perdida
router.post("/sendImage/:idUsuario", upload.single("image"), async (req, res) => {
  const user = await User.findById(req.params.idUsuario); //buscamos el usuario por su id
  try{
    const ImageURL = "/uploads/" + req.file.filename; //Guarda la ruta de la imagen
    const newActivity = new ActivityLog({ //creamos un nuevo registro en el log de actividades
      idUsuario: user._id,
      nombre: user.nombre,
      accion: "Image uploaded",
      fecha: new Date(),
    });
    await newActivity.save(); //guardamos el registro en la base de datos
    res.status(201).send({ imageURL: ImageURL }); //Envía la respuesta exitosa
  } catch (error) {
    res.status(500).send({ error: "Server error" }); //Envía la respuesta de error
  }
});

router.post("/sendPost/", async (req, res) => {
  const { titulo, tipo, descripcion, idUsuario, imageURL } = req.body; //obtenemos los datos del post
  const user = await User.findById(idUsuario); //buscamos el usuario por su id
  const fecha = new Date(); //creamos una nueva fecha
  const post = new Post({
    titulo,
    tipo,
    descripcion,
    fecha,
    autor: user.nombre,
    autorImageURL: user.imageURL,
    comentarios: [],
    numComentarios: 0,
    numLikes: 0,
    imageURL,
  });

  try {
    await post.save(); //guardamos el post
    const newActivity = new ActivityLog({ //creamos un nuevo registro en el log de actividades
      idUsuario,
      nombre: user.nombre,
      accion: "Post created",
      fecha: new Date(),
    });

    await newActivity.save(); //guardamos el registro en la base de datos
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