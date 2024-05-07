const mongoose = require("mongoose");

const Eventschema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    description: String

})

Eventschema.methods.eventExist = async function (title) {
    // Verificar si existe un evento con el título proporcionado
    const result = await this.model("Event").findOne({ title });
    return !!result; // Retornar true si existe, false si no
};



module. exports = mongoose.model("Event", Eventschema) ;

