const mongoose = require('mongoose');

const collectiveSchema = mongoose.Schema({
    name: String,
    description: String,
    admin: { type: String, ref: "User" }, 
    members: [{ type: String, ref: "User"}],
    events: [{ type: String, ref: "Event"}]
});

module.exports = mongoose.model('Collective', collectiveSchema);