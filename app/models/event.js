const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    isApproved     : { type: Boolean, default: false },
    name           : String,
    details        : {
    	public  : String,
    	private : String
    },
    applicant      : {
    	name         : String,
    	organization : String,
    	phone        : String,
    	email        : String,
    	relationship : String
    },
    contactName    : String,
    hasCollective  : { type: Boolean, default: false },
    collective     : { type: String, ref: "Collective"},
    hasGroup       : { type: Boolean, default: false },
    group          : { type: String, ref: "Group"},
    startDate      : String,
    startTime      : String,
    endDate        : String,
    endTime        : String,
    location       : { type: String, ref: "Location" },
    attendance     : Number,
    needsAmp       : Boolean,
    needsQuiet     : Boolean,
    admissionCost  : Number,
    rentCost       : Number,
    servingAlcohol : Boolean,
    sellingAlcohol : Boolean
});

module.exports = mongoose.model('Event', eventSchema);