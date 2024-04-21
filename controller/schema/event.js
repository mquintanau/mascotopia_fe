const mongoose= require('mongoose');

const EventSchema = moongose.Schema({
    start: Date,
    end: Date,
    title: String
})

const event = moongose.model('Event', EventSchema);

module.exports = event;