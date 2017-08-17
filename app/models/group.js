const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name        : String,
    description : String,
    collective  : { type: String, ref: "Collective" },
    members     : [{ type: String, ref: "User" }]
});

module.exports = mongoose.model('Group', groupSchema);