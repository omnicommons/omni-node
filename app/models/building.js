const mongoose = require('mongoose');

const buildingSchema = mongoose.Schema({
    name        : String,
    description : String,
    members     : [{ type: String, ref: "User" }]
});

module.exports = mongoose.model('Building', buildingSchema);