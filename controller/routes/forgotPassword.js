const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user")//importamos el modelo de usuario
const router = require("express").Router()//importamos el router de express
const getUserInfo = require("../lib/getUserInfo");//importamos la funcion para obtener la informacion del usuario
const jwt = require('jsonwebtoken');//importamos la libreria de jwt
require('dotenv').config();

router.post('/', async (req, res) => {
    const {correo, nombre} = req.body;
    const user= await User.findOne({correo});
    if(!user){//si el correo no existe
        return res.status(404).json(jsonResponse(404,{
            error: "Correo no encontrado"
        }));
    }
    const name = await User.findOne({nombre});
    if(!name){//si el nombre no existe
        return res.status(404).json(jsonResponse(404,{
            error: "Nombre no encontrado"
        }));
    }

    //generamos un token
    const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});

});

module.exports = router;