const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user")//importamos el modelo de usuario
const router = require("express").Router()//importamos el router de express
const getUserInfo = require("../lib/getUserInfo");//importamos la funcion para obtener la informacion del usuario

router.post('/', async (req, res) => {
    const {correo, contraseña} = req.body;//obtenemos los datos del body
    if(!!!correo ||  !!!contraseña) {//verificamos si los campos estan vacios
        return res.status(400).json(jsonResponse(400,{//retornamos un json con el mensaje de error
            error: "The fields are required"
        })
        );
    }

    //Autenticar usuario en la base de datos
    const user= await User.findOne({correo});//buscamos un usuario con el correo proporcionado
    if (user){//si el usuario existe
        const correctPassword = await user.comparePassword(contraseña, user.contraseña);//comparamos la contraseña en texto plano con la contraseña encriptada
        if (correctPassword){//si la contraseña es correcta
            const accessToken = user.createAccessToken();//creamos el token de acceso
            const refreshToken = await user.createRefreshToken();//creamos el token de refresco
            return res.status(200).json(jsonResponse(200,{//retornamos un json con el mensaje de exito
                user: getUserInfo(user),
                userId : user._id,
                accessToken,
                refreshToken
            }));
        }else{//si la contraseña es incorrecta
            return res.status(400).json(jsonResponse(400,{//retornamos un json con el mensaje de error
                error: "The email or password is incorrect"
            }));
        }
    }else{//si el usuario no existe
        return res.status(404).json(jsonResponse(404,{//retornamos un json con el mensaje de error
            error: "Email or password not found"
        }));
    }
});


module.exports = router; //exportamos el router para que pueda ser utilizado en otros archivos