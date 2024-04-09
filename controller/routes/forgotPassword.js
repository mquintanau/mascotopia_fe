const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user")//importamos el modelo de usuario
const router = require("express").Router()//importamos el router de express
const getUserInfo = require("../lib/getUserInfo");//importamos la funcion para obtener la informacion del usuario


router.post('/', async (req, res) => {

});

module.exports = router;