const mongoose = require("mongoose");

const Eventschema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    description: String

})



module. exports = mongoose.model("Event", Eventschema) ;