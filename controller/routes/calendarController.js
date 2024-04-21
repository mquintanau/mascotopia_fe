const router = require("express").Router(); //importamos el router de express
const event = require("../schema/event");
const moment = require("moment");


router.post( "/create-event", async (req, res) => {
    const event = event(req.body);
    await event.save();
    res.sendStatus (201);
})

router.get("/get-events", async (req, res) => {
    const events = await event.find({
        start: {$gte: moment(req.query.start).toDate()},
        end: {$lte: moment(req.query.end).toDate() },
    });

    res.send(events);
})




module.exports = router;