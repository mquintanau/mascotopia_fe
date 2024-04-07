const mongoose= require('mongoose');

const TokenSchema = new mongoose.Schema({
    id: { type: Object},
    token: { type: String, required: true},
});

module.exports = mongoose.model('Token', TokenSchema);//exportamos el modelo de usuario