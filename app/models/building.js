const mongoose = require('mongoose');

const buildingSchema = mongoose.Schema({
    name        : String,
    description : String,
    collectives : [{ type: String, ref: "Collective" }],
    members     : [{ type: String, ref: "User" }]
});

module.exports = mongoose.model('Building', buildingSchema);