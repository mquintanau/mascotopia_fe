const router = require("express").Router(); //importamos el router de express
const Event = require("../schema/Event"); //importamos el modelo de los eventos
const moment = require("moment");
const ActivityLog = require("../schema/ActivityLog"); //importamos el modelo de log de actividades

router.post("/create-event", async (req, res) => {
  const event = Event(req.body);
  // validar Evento
  if (
    !event ||
    !event.title ||
    !event.start ||
    !event.end ||
    !event.description
  ) {
    return res.sendStatus(400);
  }

  // Guardar evento
  await event.save();
  // Verificar si se debe registrar la actividad en el log de actividades
  if (req.body.shouldLogActivity) {
    //si se debe registrar la actividad en el log de actividades
    const newActivity = new ActivityLog({
      //creamos un nuevo registro en el log de actividades
      idUsuario: req.body.idUsuario,
      nombre: req.body.nombreUsuario,
      accion: "Event created",
      fecha: new Date(),
    });
    await newActivity.save(); //guardamos el registro en la base de datos
  }
  res.sendStatus(201);
});

router.get("/get-events", async (req, res) => {
  const events = await Event.find({
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },
  });

  res.send(events);
});

router.get("/get-events-today", async (req, res) => {
  const todayStart = moment().startOf("day");
  const todayEnd = moment().endOf("day");

  const events = await Event.find({
    start: { $lte: todayEnd.toDate() },
    end: { $gte: todayStart.toDate() },
  });

  res.send(events);
});

router.delete("/delete-event/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { idUsuario, nombreUsuario } = req.body;

    // Find and delete the event by ID
    const event = await Event.findByIdAndDelete(id); // Ensure that the Event object is properly defined

    // Verificar si se debe registrar la actividad en el log de actividades
    const newActivity = new ActivityLog({
      idUsuario: idUsuario,
      nombre: nombreUsuario,
      accion: "Event deleted",
      fecha: new Date(),
    });

    await newActivity.save(); // Guardar el registro en la base de datos
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al borrar el evento:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
