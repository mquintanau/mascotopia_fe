const mongoose = require("mongoose");

const Eventschema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String

})

const Event= mongoose.model("Event", Eventschema);

module. exports = Event;