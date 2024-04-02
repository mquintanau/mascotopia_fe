function getUserInfo(user){//funcion para obtener la informacion del usuario SIN la contraseña
    return{
        correo: user.correo,
        nombre: user.nombre,
        id : user.id
    }
}

module.exports = getUserInfo; //exportamos la funcion para que pueda ser utilizada en otros archivos