const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    idUsuario: {type: String, required: true},  
    nombre: {type: String, required: true},
    accion: {type: String, required: true},
    fecha: {type: Date,default: Date.now, required: true},
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);