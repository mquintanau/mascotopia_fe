//respuesta del servidor en formato JSON
exports.jsonResponse = function (statusCode, body) {//creamos una función que recibe dos parámetros, el código de estado y el cuerpo de la respuesta
    return{//retornamos un objeto con el código de estado y el cuerpo de la respuesta
        statusCode,
        body,
    };
};