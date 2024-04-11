const jwt = require('jsonwebtoken');
require('dotenv').config();//importamos la configuracion de las variables de entorno

function sign(payload, isAccessToken){//funcion para generar el token
    return jwt.sign(payload, //payload
        isAccessToken //verificamos si es un token de acceso o de refresco
        ? process.env.ACCESS_TOKEN_SECRET //si es de acceso utilizamos la clave de acceso
        : process.env.REFRESH_TOKEN_SECRET,//si es de refresco utilizamos la clave de refresco
        {algorithm: 'HS256', expiresIn: 3600})//configuramos el algoritmo y el tiempo de expiracion

}

function generateAccessToken(user){
    return sign({user}, true);//generamos el token de acceso
}

function generateRefreshToken(user){
    return sign({user}, false);//generamos el token de refresco
}


module.exports = { //exportamos las funciones para que puedan ser utilizadas en otros archivos
    generateAccessToken,
    generateRefreshToken
};