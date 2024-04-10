const { jsonResponse } = require("../lib/jsonResponse"); //Generar respuestas JSON en el formato adecuado 
const User = require("../schema/user")//importamos el modelo de usuario (archivo contiene la definición del esquema del modelo de usuario con Mongoose.)
const router = require("express").Router()//importamos el router de express 
const getUserInfo = require("../lib/getUserInfo");//importamos la funcion para obtener la informacion del usuario

router.get('/', async (req, res) => {
    // Obtener la información del usuario desde la base de datos             
    try{
        const userId = req.params.userId; //Obtén el ID del usuario de los parámetros de la URL
        const user = await User.findOne(userId);// Busca el usuario en la base de datos por su ID
        // Verifica si se encontró el usuario
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Devuelve los datos del perfil del usuario en formato JSON
        res.json(user);
        
    } catch (error) {
        res.status(500).json(jsonResponse(500,{//retornamos un json con el mensaje de error
            error: 'Internal Server Error'
        }));
    }

});

module.exports = router; //exportamos el router para que pueda ser utilizado en otros archivos