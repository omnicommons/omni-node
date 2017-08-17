const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name        : String,
    description : String,
    type        : String,
    building    : { type: String, ref: "Building" },
    collective  : { type: String, ref: "Collective" },
    members     : [{ type: String, ref: "User" }],
    events      : [{ type: String, ref: "Event" }]
});

module.exports = mongoose.model('Group', groupSchema);