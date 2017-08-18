/* Require Modules */
const moment     = require('moment');

/* Load Models */
const User        = require('../models/user');
const Collective  = require('../models/collective');
const Event       = require('../models/event');

/* Middleware */
const loginRequired = require('../middleware/loginRequired');
const adminRequired = require('../middleware/adminRequired');

module.exports = function(app) {

    /* Apply For Event Page Page */
    app.get('/events/apply', function(req, res) {
        res.render('events/apply.ejs', {
            title : "Apply For Event"
        });
    }); 

};	