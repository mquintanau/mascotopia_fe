const router = require("express").Router(); //importamos el router de express
const Event = require("../schema/Event"); //importamos el modelo de los eventos
const moment = require("moment");
const ActivityLog = require("../schema/ActivityLog");//importamos el modelo de log de actividades

router.post("/create-event", async(req, res)=> {
    const event = Event(req.body);
    await event.save();


    // Verificar si se debe registrar la actividad en el log de actividades
    if (req.body.shouldLogActivity) {//si se debe registrar la actividad en el log de actividades
        const newActivity = new ActivityLog({//creamos un nuevo registro en el log de actividades
            idUsuario: req.body.idUsuario,
            nombre: req.body.nombre,
            accion: "Event created",
            fecha: new Date()
        });
        await newActivity.save();//guardamos el registro en la base de datos
    }


    res.sendStatus(201);
})

router.get("/get-events", async(req,res)=> {
    const events = await Event.find({
        start: { $gte: moment(req.query.start).toDate() },
        end: { $lte: moment(req.query.end).toDate()   }
    });

    res.send(events);
})

router.delete("/delete-event/:title", async (req, res) => {
    try {
        const title = req.params.title;
        const {id, nombre} = req.body;
        // Buscar y eliminar el evento por título
        await Event.findOneAndDelete({ title: title });


        // Verificar si se debe registrar la actividad en el log de actividades
        const newActivity = new ActivityLog({//creamos un nuevo registro en el log de actividades
            idUsuario: id,
            nombre: nombre,
            accion: "Event deleted",
            fecha: new Date()
        });

        await newActivity.save();//guardamos el registro en la base de datos


        res.sendStatus(200);
    } catch (error) {
        console.error("Error al borrar el evento:", error);
        res.sendStatus(500);
    }
});

module.exports = router;