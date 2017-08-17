const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name        : String,
    description : String,
    events      : [{ type: String, ref: "Event"}]
});

module.exports = mongoose.model('Location', locationSchema);