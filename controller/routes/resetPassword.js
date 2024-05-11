const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user"); // importamos el modelo de usuario
const router = require("express").Router(); // importamos el router de express
const getUserInfo = require("../lib/getUserInfo"); // importamos la funcion para obtener la informacion del usuario
const jwt = require('jsonwebtoken'); // importamos la libreria de jwt
const { hash } = require("bcrypt");
const bcrypt = require('bcrypt');
const ActivityLog = require("../schema/ActivityLog"); // importamos el modelo de log de actividades


router.post('/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { contraseña, contraseñaRev } = req.body;


    if (!contraseña || !contraseñaRev) { //verificamos si los campos estan vacios
        return res.status(400).json(jsonResponse(400, { //retornamos un json con el mensaje de error
            error: "The fields are required"
        }));
    }

    if (contraseña !== contraseñaRev) {
        return res.status(400).json(jsonResponse(400, {
            error: "The passwords do not match"
        }));
    }


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json(jsonResponse(403, {
                error: "Invalid token"
            }));
        } else {
            bcrypt.hash(contraseña, 10)
                .then(hash => {
                    User.findByIdAndUpdate({_id: id}, {contraseña: hash })
                    // Aquí va el código que deseas ejecutar después de hashear la contraseña
                    .then(async u => {

                        const newActivity = new ActivityLog({//creamos un nuevo registro en el log de actividades
                            idUsuario: u._id,
                            nombre: u.nombre,
                            accion: "Password updated",
                            fecha: new Date()
                        });

                        await newActivity.save();//guardamos el registro en la base de datos

                        return res.status(200).json(jsonResponse(200, {
                            message: "Password updated successfully"
                        }));
                    })
                    .catch(err => {
                        return res.status(400).json(jsonResponse(400, {
                            error: "Error updating password"
                        }));
                    });
                })
        }
    });
});

module.exports = router;