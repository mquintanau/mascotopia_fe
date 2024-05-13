const router = require("express").Router(); //importamos el router de express
const Event = require("../schema/Event"); //importamos el modelo de los eventos
const moment = require("moment");

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

router.delete("/delete-event/:title", async (req, res) => {
  try {
    const title = req.params.title;
    // Buscar y eliminar el evento por título
    await Event.findOneAndDelete({ title: title });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al borrar el evento:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
