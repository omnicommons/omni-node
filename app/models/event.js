const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    description: String,
    startDate: String,
    endDate: String,
    startTime: String,
    endTime: String,
    hasCollective: Boolean,
    collective: { type: String, ref: "Collective" },
    members: [{ type: String, ref: "User"}]
});

module.exports = mongoose.model('Event', eventSchema);