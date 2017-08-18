const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    isOpen      : Boolean,
    name        : String,
    description : String,
    peopleMax   : Number,
    events      : [{ type: String, ref: "Event"}]
});

module.exports = mongoose.model('Location', locationSchema);