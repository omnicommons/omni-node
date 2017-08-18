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

    /* Collectives List Page */
    app.get('/collectives', getAllCollectives, function(req, res) {
        res.render('collectives/list.ejs', {
            title : "Collectives List"
        });
    });  

    /* New Feature Page */
    app.get('/collectives/new', loginRequired, adminRequired, function(req, res) {
        res.render('collectives/new.ejs', {
            title : "Add New Collective"
        });
    });

    app.post('/collectives/new', adminRequired, function(req, res) {
        let newCollective = new Collective({
            name: req.body.name,
            description: req.body.summernoteContent
        });
        newCollective.save(function(error, collective){
            if(error){ console.log(error); }
            res.redirect('/collectives');
        });
    });    

    /*  Edit Collective */
    app.get('/collectives/:collectiveId/edit', adminRequired, function(req, res) {
        Collective
        .findOne({'_id': req.params.collectiveId})
        .exec(function (err, collective) {
            res.render('collectives/edit.ejs', {
                title : "Edit Collective",
                collective: collective
            });
        });    
    });

    app.post('/collectives/:collectiveId/edit', adminRequired, function(req, res) {
        Collective
        .findOne({'_id': req.params.collectiveId})
        .exec(function (err, collective) {
            collective.name = req.body.name;
            collective.description = req.body.summernoteContent;
            collective.save(function(error){
                if(error){ console.log(error); }
                res.redirect('/collectives/' + collective.name);
            }); 
        });
    });

    /*  Remove Collective */
    app.post('/collectives/:collectiveId/delete', adminRequired, function(req, res) {
        Collective.findOneAndRemove({'_id': req.params.collectiveId}, function (err, collective) {
            res.redirect('/collectives'); 
        });
    });

    /* Join Collective */
    app.post('/collectives/:collectiveId/join', loginRequired, function(req, res) {
        Collective
        .findOne({_id: req.params.collectiveId})
        .exec(function(error, collective){
            if(error){ console.log(error); }
            collective.members.push(req.user._id);
            collective.save(function(error){
                if(error){ console.log(error); }
                User
                .findOne({_id: req.user._id})
                .exec(function(error, user){
                    user.collectives.push(collective._id);
                    user.save(function(error){
                        if(error){ console.log(error); }
                        res.redirect('/collectives/' + collective.name);
                    });
                });
            });
        });
    });

    /* Leave Collective */
    app.post('/collectives/:collectiveId/leave', loginRequired, function(req, res) {
        Collective
        .findOne({_id: req.params.collectiveId})
        .exec(function(error, collective){
            if(error){ console.log(error); }
            User
            .findOne({_id: req.user._id})
            .exec(function(error, user){
                if(error){ console.log(error); }
                let userArrayPosition = -1;
                for(var i = 0; i < collective.members.length; i++){
                    console.log("Member ID: " + collective.members[i]);
                    console.log("User ID: " + user._id);
                    if(String(collective.members[i]) === String(user._id)){
                        userArrayPosition = i;
                    }
                }
                console.log(userArrayPosition);
                if(userArrayPosition > -1){
                    collective.members.splice(userArrayPosition, 1);
                }
                collective.save(function(error){
                    if(error){ console.log(error); }
                    let collectiveArrayPosition = -1;
                    for(var i = 0; i < user.collectives.length; i++){
                        if(String(user.collectives[i]) === String(collective._id)){
                            collectiveArrayPosition = i;
                        }
                    }
                    if(collectiveArrayPosition > -1){
                        user.collectives.splice(collectiveArrayPosition, 1);
                    }
                    user.save(function(error){
                        if(error){ console.log(error); }
                        res.redirect('/collectives/' + collective.name);
                    });                                   
                });                
            });
        });
    });    


    /* Collective Profile Page */
    app.get('/collectives/:collectiveName', function(req, res) {
        Collective
        .findOne({name: req.params.collectiveName})
        .populate('members')
        .exec(function(error, collective){
            if(error){ console.log(error); }

            res.render('collectives/show.ejs', {
                title : "Collective Profile",
                collective: collective,
            });                
            
        });
    });

}; // end module export

function getAllCollectives(req, res, next){
    Collective
    .find({},{},{sort: {name: 1}})
    .populate('members')
    .exec(function(error, collectives){
        if(error){ console.log(error); }
        res.locals.collectives = collectives;
        next();
    });
};