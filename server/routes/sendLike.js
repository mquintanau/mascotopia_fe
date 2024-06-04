const router = require("express").Router(); //importamos el router de express
const ActivityLog = require("../schema/ActivityLog"); //importamos el modelo de log de actividades
const User = require("../schema/user"); //importamos el modelo de usuario
const Post = require("../schema/post"); //importamos el modelo de post

//crea ruta para hacer comentario
router.post("/", async (req, res) => {
  const { postId, idUser } = req.body; //obtenemos el id del post y del usuario
  const post = await Post.findById(postId); //buscamos el post por id
  const user = await User.findById(idUser); //buscamos el usuario por su id
  let likeGiven = false;

  if (post && user) {
    //verificamos que el post y el usuario existan
    // Verificamos que en el atributo likes se encuentre el id del usuario
    if (post.likes.includes(idUser)) {
      post.likes = post.likes.filter((id) => id !== idUser); //removemos el id del usuario del arreglo de likes
      likeGiven = true;
    } else {
      post.likes.push(idUser); //agregamos el id del usuario al arreglo de likes
    }
    post.numLikes = post.likes.length; //actualizamos el numero de likes
    post.save(); //guardamos el post

    const newActivity = new ActivityLog({
      //creamos un nuevo registro en el log de actividades
      idUsuario: idUser,
      nombre: user.nombre,
      accion: "Liked post",
      fecha: new Date(),
    });
    newActivity.save(); //guardamos el registro

    res.status(201).json({ likeGiven }); //retornamos un json con respuesta de like dado
  } else {
    res.status(404).json({ error: "Post not found" }); //retornamos un json con el error
  }
});

module.exports = router; //exportamos el router
