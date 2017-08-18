/* Require Modules */
const moment     = require('moment');

/* Load Models */
const User        = require('../models/user');
const Collective  = require('../models/collective');
const Location    = require('../models/location');
const Event       = require('../models/event');

/* Middleware */
const loginRequired = require('../middleware/loginRequired');
const adminRequired = require('../middleware/adminRequired');



module.exports = function(app) {

    /* Locations List Page */
    app.get('/locations', getAllLocations, function(req, res) {
        res.render('locations/list.ejs', {
            title : "Locations List"
        });
    });  

    /* New Location Page */
    app.get('/locations/new', loginRequired, adminRequired, function(req, res) {
        res.render('locations/new.ejs', {
            title : "Add New Location"
        });
    });

    app.post('/locations/new', adminRequired, function(req, res) {
        let newLocation = new Location({
            name: req.body.name,
            description: req.body.summernoteContent,
            peopleMax: req.body.peopleMax
        });
        newLocation.save(function(error, location){
            if(error){ console.log(error); }
            res.redirect('/locations');
        });
    });    

    /*  Edit Location */
    app.get('/locations/:locationId/edit', adminRequired, function(req, res) {
        Location
        .findOne({'_id': req.params.locationId})
        .exec(function (err, location) {
            res.render('locations/edit.ejs', {
                title : "Edit Location",
                location: location
            });
        });    
    });

    app.post('/locations/:locationId/edit', adminRequired, function(req, res) {
        Location
        .findOne({'_id': req.params.locationId})
        .exec(function (err, location) {
            location.name = req.body.name;
            location.description = req.body.summernoteContent;
            location.peopleMax = req.body.peopleMax;
            location.save(function(error){
                if(error){ console.log(error); }
                res.redirect('/locations/' + location.name);
            }); 
        });
    });

    /*  Remove Collective */
    app.post('/locations/:locationId/delete', adminRequired, function(req, res) {
        Location.findOneAndRemove({'_id': req.params.locationId}, function (err, location) {
            res.redirect('/locations'); 
        });
    });   


    /* Collective Profile Page */
    app.get('/locations/:locationName', function(req, res) {
        Location
        .findOne({name: req.params.locationName})
        .populate('events')
        .exec(function(error, location){
            if(error){ console.log(error); }

            res.render('locations/show.ejs', {
                title : "Location Profile",
                location: location,
            });                
            
        });
    });

}; // end module export

function getAllLocations(req, res, next){
    Location
    .find({},{},{sort: {name: 1}})
    .populate('events')
    .exec(function(error, locations){
        if(error){ console.log(error); }
        res.locals.locations = locations;
        next();
    });
};